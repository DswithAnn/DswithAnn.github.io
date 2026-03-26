# Implementation Plan: Fix Build Bugs in Live Server and GitHub Pages Deployment

## Task Type
- [x] Frontend (→ Gemini)
- [ ] Backend (→ Codex)
- [ ] Fullstack (→ Parallel)

## Identified Bugs

### Bug 1: Missing 404.html File
**Problem**: The build script and deployment workflow reference `out/404.html`, but **no 404 page exists** in the codebase.
- `deploy.sh`: `cp out/404.html out/404/index.html`
- `.github/workflows/ci-cd.yml`: `cp out/404.html out/404/index.html`
- Build output shows: `○ /_not-found` but no explicit 404.html generation

**Impact**: 
- GitHub Pages 404 handling will fail
- Users see generic GitHub Pages 404 instead of branded error page
- SPA routing breaks on page refresh (GitHub Pages needs 404.html for client-side routing)

### Bug 2: basePath Mismatch Between Environments
**Problem**: `next.config.js` uses environment variable that may not be set correctly:
```javascript
basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/AutoMationServices'
```

**Impact**:
- Local dev: basePath defaults to `/AutoMationServices` but repo may have different name
- GitHub Pages: Assets load from wrong path if basePath doesn't match repo name
- Live server: May work if basePath matches, but inconsistent configuration

### Bug 3: deploy.sh Uses SSH Instead of HTTPS for GitHub Pages
**Problem**: `deploy.sh` uses SSH remote URL:
```bash
git remote add origin git@github.com:AnnNaserNabil/AutoMationServices.git
```

**Impact**:
- GitHub Actions workflow uses HTTPS with `GITHUB_TOKEN`
- Manual deploys via `deploy.sh` require SSH key setup
- Inconsistent deployment methods between local and CI

### Bug 4: No Static 404 Page for SSG Export
**Problem**: Next.js static export (`output: 'export'`) requires explicit `not-found.tsx` or `404.tsx` to generate `404.html`, but none exists.

**Impact**:
- Build succeeds but `out/404.html` doesn't exist
- Copy command fails silently or errors
- GitHub Pages routing broken for SPA

## Technical Solution

### Solution Overview
1. **Create `src/app/not-found.tsx`** - Explicit 404 page component that matches site design
2. **Fix basePath configuration** - Ensure consistency across environments
3. **Update deploy.sh** - Use HTTPS for consistency with GitHub Actions
4. **Add 404.html verification** - Ensure build fails if 404.html missing

### Implementation Steps

1. **Create 404 Page Component** - `src/app/not-found.tsx`
   - Expected deliverable: React component with Header/Footer, branded 404 message, link back to home

2. **Update next.config.js** - Fix basePath handling
   - Expected deliverable: Clearer basePath configuration with comments

3. **Update deploy.sh** - Fix git remote URL
   - Expected deliverable: Use HTTPS URL format for consistency

4. **Update .github/workflows/ci-cd.yml** - Add 404.html verification
   - Expected deliverable: Verification step before deploy

5. **Update package.json deploy script** - Add error handling
   - Expected deliverable: Fail-fast if 404.html missing

## Key Files

| File | Operation | Description |
|------|-----------|-------------|
| `src/app/not-found.tsx` | Create (L1-L80) | New 404 page component with branded design |
| `next.config.js` | Modify (L1-L15) | Add comments clarifying basePath configuration |
| `deploy.sh` | Modify (L12) | Change SSH URL to HTTPS format |
| `.github/workflows/ci-cd.yml` | Modify (L30-35) | Add 404.html verification step |
| `package.json` | Modify (scripts.deploy) | Add 404.html existence check |

## Pseudo-Code

### not-found.tsx Component
```tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HomeIcon, AlertCircleIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircleIcon className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl mb-8">Page not found</p>
          <Link href="/" className="btn-primary">
            <HomeIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

## Risks and Mitigation

| Risk | Mitigation |
|------|------------|
| 404 page styling doesn't match site | Use existing Header/Footer components and Tailwind classes from design system |
| basePath change breaks existing URLs | Test locally first, verify asset paths in build output |
| deploy.sh change breaks manual deploys | Test HTTPS URL format, document any required auth setup |
| Verification step breaks CI/CD | Add step before deploy, ensure clear error messages |

## Verification Steps

1. **Local Build Test**:
   ```bash
   npm run build
   ls -la out/404.html  # Should exist
   ```

2. **404 Page Test**:
   ```bash
   cd out
   python3 -m http.server 8000
   # Navigate to http://localhost:8000/nonexistent-page
   ```

3. **GitHub Pages Test**:
   - Push to main branch
   - Verify GitHub Actions workflow completes
   - Test 404 on live site

4. **basePath Verification**:
   - Check built HTML for correct asset paths
   - Verify CSS/JS load correctly on GitHub Pages

## SESSION_ID (for /ccg:execute use)
- CODEX_SESSION: N/A (Frontend-only fix)
- GEMINI_SESSION: N/A (Planning phase only)
