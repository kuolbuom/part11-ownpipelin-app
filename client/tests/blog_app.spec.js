import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test.describe('login', () => {
    test('Login succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('link', { name: 'login' }).click()

      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('Login fails with wrong password', async ({ page }) => {
      await page.getByRole('link', { name: 'login' }).click()

      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('wrong')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(
        page.getByText('wrong username or password')
      ).toBeVisible()
    })

    test.describe('when logged in', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByRole('link', { name: 'login' }).click()

        await page.getByLabel('username').fill('mluukkai')
        await page.getByLabel('password').fill('salainen')

        await page.getByRole('button', { name: 'login' }).click()
      })

      test('A logged in user can create a blog', async ({ page }) => {

        await page.getByRole('link', { name: 'new blog' }).click()

        await page.locator('#title').fill('Playwright Blog')
        await page.locator('#author').fill('Kuol')
        await page.locator('#url').fill('https://playwright.dev')

        await page.getByRole('button', { name: 'create' }).click()



        await page.waitForTimeout(1000)
        console.log(await page.url())
        await page.pause()

        await expect(
          page.getByRole('link', { name: 'Playwright Blog Kuol' })
        ).toBeVisible()
      })

      test('A logged in user can like a blog', async ({ page }) => {

        await page.getByRole('link', { name: 'new blog' }).click()

        await page.locator('#title').fill('Playwright Blog')
        await page.locator('#author').fill('Kuol')
        await page.locator('#url').fill('https://playwright.dev')

        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('link', { name: 'Playwright Blog Kuol' }).click()

        await page.waitForTimeout(1000)
        console.log(await page.url())
        await page.pause()



        // await page.getByText('Like Test').click()

        await page.getByRole('button', { name: 'like' }).click()

        await expect(
          page.getByText('likes 1')
        ).toBeVisible()
      })

      test('A logged in user can delete a blog', async ({ page }) => {

        await page.getByRole('link', { name: 'new blog' }).click()

        await page.locator('#title').fill('Playwright Blog')
        await page.locator('#author').fill('Kuol')
        await page.locator('#url').fill('https://playwright.dev')

        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('link', {name: 'Playwright Blog Kuol'}).click()

         await page.getByRole('button', { name: 'remove' }).click()

        page.on('dialog', dialog => dialog.accept())

         await expect(
          page.getByRole('link', { name: 'Playwright Blog Kuol' })
        ).not.toBeVisible()
      })
    })

  })
})

