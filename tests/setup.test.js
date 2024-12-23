import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Project Configuration Tests', () => {
  it('has required configuration files', () => {
    const requiredFiles = [
      'vite.config.ts',
      '.github/workflows/deploy.yml',
      'package.json',
      'tsconfig.json',
      'tsconfig.node.json',
      'public/images/logo.svg'
    ]

    requiredFiles.forEach(file => {
      expect(fs.existsSync(path.resolve(file))).toBe(true)
    })
  })

  it('has correct GitHub workflow configuration', () => {
    const workflow = fs.readFileSync('.github/workflows/deploy.yml', 'utf8')
    
    expect(workflow).toContain('Deploy to GitHub Pages')
    expect(workflow).toContain('VITE_POSTHOG_API_KEY')
    expect(workflow).toContain('VITE_PUBLIC_POSTHOG_HOST')
    expect(workflow).toContain('links.harshjoshi.dev')
  })

  it('has correct Vite configuration', () => {
    const viteConfig = fs.readFileSync('vite.config.ts', 'utf8')
    
    expect(viteConfig).toContain('base: \'/\'')
    expect(viteConfig).toContain('@tsparticles/slim')
    expect(viteConfig).toContain('outDir: \'dist\'')
  })
}) 