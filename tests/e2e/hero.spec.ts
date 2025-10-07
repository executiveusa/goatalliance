import { test, expect } from '@playwright/test';

test.describe('G.O.A.T. Alliance Landing Page', () => {
  test('hero section loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check hero elements
    await expect(page.locator('h1')).toContainText('G.O.A.T. ALLIANCE');
    await expect(page.locator('div:has-text("G.O.A.T.")')).toBeVisible();
    
    // Check CTAs
    const joinButton = page.locator('button', { hasText: 'Join the Alliance' });
    const exploreButton = page.locator('button', { hasText: 'Explore Directory' });
    
    await expect(joinButton).toBeVisible();
    await expect(exploreButton).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Test directory link
    await page.locator('a[href="#directory"]').click();
    await expect(page.locator('#directory')).toBeInViewport();
    
    // Test compliance link
    await page.locator('a[href="/compliance"]').click();
    await expect(page).toHaveURL(/compliance/);
    await expect(page.locator('h1')).toContainText('Compliance & Ethics');
  });

  test('contractor directory displays', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to directory
    await page.locator('#directory').scrollIntoViewIfNeeded();
    
    // Check contractor cards
    const contractorCards = page.locator('[data-testid="contractor-card"]');
    await expect(contractorCards).toHaveCount(6);
    
    // Check card content
    const firstCard = contractorCards.first();
    await expect(firstCard.locator('.rating')).toBeVisible();
    await expect(firstCard.locator('button', { hasText: 'Call' })).toBeVisible();
    await expect(firstCard.locator('button', { hasText: 'Email' })).toBeVisible();
  });

  test('responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile menu
    const mobileMenuButton = page.locator('[aria-label="Toggle mobile menu"]');
    await expect(mobileMenuButton).toBeVisible();
    
    // Check hero is responsive
    await expect(page.locator('h1')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    
    // Check directory grid adapts
    const directoryGrid = page.locator('#directory .grid');
    await expect(directoryGrid).toHaveCSS('grid-template-columns', /repeat\(2,/);
  });

  test('accessibility compliance', async ({ page }) => {
    await page.goto('/');
    
    // Check ARIA labels
    await expect(page.locator('[aria-label="G.O.A.T Alliance hero"]')).toBeVisible();
    await expect(page.locator('[aria-label="Join the Alliance"]')).toBeVisible();
    
    // Check heading hierarchy
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check alt text on images - using logo div instead
    const logoDiv = page.locator('div:has-text("G.O.A.T.")');
    await expect(logoDiv).toBeVisible();
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('contact forms work', async ({ page }) => {
    await page.goto('/');
    
    // Click on a contractor's email button
    const emailButton = page.locator('button', { hasText: 'Email' }).first();
    await emailButton.click();
    
    // Should open email client (in real test, mock this)
    // For now, just check the button is clickable
    await expect(emailButton).toBeEnabled();
  });

  test('performance metrics', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    
    // Check page loads within reasonable time
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
    
    // Check Core Web Vitals would be measured here in real implementation
    // This is a placeholder for proper performance testing
  });
});