const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'testName',
                username: 'testUsername',
                password: 'testPassword'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByRole('button', { name: 'cancel'})
        const locatorTwo = page.getByRole('heading', { name: 'Login' })
        await expect(locator).toBeVisible()
        await expect(locatorTwo).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'testUsername', 'testPassword')
            const locator = page.getByText('testName logged in')
            await expect(locator).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'testUsername', 'test')
            const locator = page.getByText('wrong username or password')
            await expect(locator).toBeVisible()
            
        })
    })

    describe('when logged in', async () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'testUsername', 'testPassword')
        })

        test('logged in user can create a new blog', async ({ page }) => {
            await createBlog(page, 'newTestTitle2', 'newTestAuthor2', 'newTestUrl2')
            const locator = page.getByText('a new blog newTestTitle2 newTestAuthor2 added')
            await expect(locator).toBeVisible()
        })

        describe('when there is a blog', async () => {
            beforeEach(async ({ page }) =>{
                await createBlog(page, 'newTitle1', 'newAuthor1', 'newUrl1')
            })
            
            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view'}).click()
                await page.getByRole('button', { name: 'like'}).click()
            })
        })
    })
})