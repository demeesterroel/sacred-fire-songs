import { test, expect } from '@playwright/test';

test('should filter songs when searching', async ({ page }) => {
    // 1. Go to the app (make sure npm run dev is running!)
    await page.goto('http://localhost:3000');

    // 2. Count initial cards (should be 5)
    const initialCards = page.locator('h3');
    await expect(initialCards).toHaveCount(5);

    // 3. Type "Water" into the search bar
    const searchInput = page.getByPlaceholder('Search title or lyrics...');
    await searchInput.fill('Water');

    // 4. Verify only 1 card remains
    await expect(initialCards).toHaveCount(1);
    await expect(page.getByText('Water Spirit')).toBeVisible();
});

test('should show empty state for no results', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const searchInput = page.getByPlaceholder('Search title or lyrics...');
    await searchInput.fill('xyz');

    // Verify the "No songs found" message appears
    await expect(page.getByText('No songs found')).toBeVisible();
});