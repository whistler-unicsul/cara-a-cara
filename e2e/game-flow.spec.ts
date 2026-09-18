import { test, expect } from '@playwright/test'

// ── Happy-path E2E: Phase 1 complete game flow ────────────────────────────────
//
// Strategy to identify the secret character via questions:
//   1. Ask "Usa cocar?" → SIM = AIÊ
//   2. Ask "Usa turbante?" → SIM = KOJO
//   3. Ask "Tem feijão?" → SIM = ZUMBI
//   4. Otherwise = AMARA
// Then eliminate all non-secret cards and click "Adivinhar!"

test('Phase 1 complete game flow', async ({ page }) => {
  // ── 1. Home / Menu ────────────────────────────────────────────────────────
  await page.goto('http://localhost:5173/')
  await expect(page.getByRole('heading', { name: 'Cara a Cara Brasil' })).toBeVisible()

  // ── 2. Start game ─────────────────────────────────────────────────────────
  await page.getByRole('button', { name: /iniciar jogo/i }).click()
  await expect(page).toHaveURL(/\/avatar/)

  // ── 3. Avatar selection ───────────────────────────────────────────────────
  const firstAvatar = page.getByRole('button', { name: /leão/i })
  await expect(firstAvatar).toBeVisible()
  await firstAvatar.click()

  await page.getByPlaceholder('Digite seu apelido').fill('Tester')

  await page.getByRole('button', { name: /jogar/i }).click()

  // ── 4. Phase Map ──────────────────────────────────────────────────────────
  await expect(page).toHaveURL(/\/phases/)
  await expect(page.getByRole('heading', { name: /mapa de fases/i })).toBeVisible()

  // ── 5. Start Phase 1 ──────────────────────────────────────────────────────
  await page.getByRole('button', { name: /fase 1/i }).click()
  await expect(page).toHaveURL(/\/game\/1/)

  // ── 6. Verify character cards are visible (Phase 1 has 4 characters) ──────
  const characterCards = page.locator('[data-testid="character-card"]')
  await expect(characterCards).toHaveCount(4, { timeout: 10000 })

  // ── 7. Verify question buttons are visible ─────────────────────────────────
  const questionBtns = page.locator('[data-testid="question-btn"]')
  await expect(questionBtns.first()).toBeVisible({ timeout: 5000 })

  // ── 8. Ask "Usa cocar?" to help identify secret character ─────────────────
  //
  // Q answers: aie=true, kojo=false, zumbi=false, amara=false
  const cocarBtn = page.locator('[data-testid="question-btn"]', { hasText: 'usa cocar' })
  await expect(cocarBtn).toBeVisible({ timeout: 5000 })
  await cocarBtn.click()

  // Wait for answer (SIM ✓ or NÃO ✗)
  const answerArea = page.locator('text=SIM').or(page.locator('text=NÃO'))
  await expect(answerArea).toBeVisible({ timeout: 5000 })

  const cocarAnswer = await page.locator('span').filter({ hasText: /SIM|NÃO/ }).first().textContent()
  const cocarIsYes = cocarAnswer?.includes('SIM') ?? false

  // ── 9. Ask a second question if needed ────────────────────────────────────
  let secretName: string

  if (cocarIsYes) {
    // Secret is AIÊ
    secretName = 'Aiê'
  } else {
    // Ask "Usa turbante?" → kojo=true, zumbi=false, amara=false
    const turbanteBtn = page.locator('[data-testid="question-btn"]', { hasText: 'usa turbante' })
    await turbanteBtn.click()
    await page.waitForTimeout(300)

    const turbanteAnswer = await page.locator('span').filter({ hasText: /SIM|NÃO/ }).first().textContent()
    const turbanteIsYes = turbanteAnswer?.includes('SIM') ?? false

    if (turbanteIsYes) {
      secretName = 'Kojo'
    } else {
      // Ask "vem de feijão?" → zumbi=true, amara=false
      const feijaoBtn = page.locator('[data-testid="question-btn"]', { hasText: 'vem de feijão' })
      await feijaoBtn.click()
      await page.waitForTimeout(300)

      const feijaoAnswer = await page.locator('span').filter({ hasText: /SIM|NÃO/ }).first().textContent()
      const feijaoIsYes = feijaoAnswer?.includes('SIM') ?? false

      secretName = feijaoIsYes ? 'Zumbi' : 'Amara'
    }
  }

  // ── 10. Eliminate all cards except the secret ─────────────────────────────
  //
  // The characters are: Aiê, Kojo, Zumbi, Amara
  // Click all cards that are NOT the secret character
  const allCharNames = ['Aiê', 'Kojo', 'Zumbi', 'Amara']
  const toEliminate = allCharNames.filter(name => name !== secretName)

  for (const charName of toEliminate) {
    // Find the active card for this character and click it
    const card = page.locator('[data-testid="character-card"]', { hasText: charName })
    // Only click if currently active (aria-pressed="true")
    const isActive = await card.getAttribute('aria-pressed')
    if (isActive === 'true') {
      await card.click()
      await page.waitForTimeout(200)
    }
  }

  // ── 11. Click "Adivinhar!" ─────────────────────────────────────────────────
  const guessButton = page.locator('button', { hasText: 'Adivinhar!' })
  await expect(guessButton).toBeVisible({ timeout: 5000 })
  await guessButton.click()

  // ── 12. CelebrationOverlay appears ────────────────────────────────────────
  await expect(page.locator('[data-testid="celebration-overlay"]')).toBeVisible({ timeout: 10000 })

  // ── 13. EducationalCard appears (after celebration auto-dismisses ~2.5s) ──
  await expect(page.locator('[data-testid="educational-card"]')).toBeVisible({ timeout: 10000 })
  await expect(page.getByRole('button', { name: /próximo/i })).toBeVisible({ timeout: 5000 })

  // ── 14. Click Próximo ──────────────────────────────────────────────────────
  await page.getByRole('button', { name: /próximo/i }).click()

  // ── 15. Navigate back to Phase Map ────────────────────────────────────────
  await expect(page).toHaveURL(/\/phases/, { timeout: 10000 })

  // ── 16. Verify "Concluída" badge on Phase 1 ────────────────────────────────
  await expect(page.locator('text=Concluída')).toBeVisible({ timeout: 5000 })
})
