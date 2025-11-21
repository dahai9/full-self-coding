import { CodeTask } from './types';

export const sampleTasks: CodeTask[] = [
  {
    id: 'TASK-001',
    description: 'Implement user authentication system',
    detailedReport: `Task Overview:
- Implemented JWT-based authentication
- Added user registration and login endpoints
- Created middleware for protected routes
- Added password hashing with bcrypt

Technical Details:
- Created User model with email, password hash, timestamps
- Implemented /auth/register and /auth/login endpoints
- Added JWT token generation and validation
- Created authentication middleware for API protection

Testing:
- Added unit tests for authentication functions
- Integration tests for API endpoints
- Password strength validation implemented

Security Considerations:
- Password hashing with salt rounds = 12
- JWT tokens expire after 24 hours
- Rate limiting implemented on auth endpoints
- Input sanitization and validation

Files Modified:
- src/models/User.ts (new)
- src/routes/auth.ts (new)
- src/middleware/auth.ts (new)
- src/app.ts (modified)
- tests/auth.test.ts (new)`,
    pushedGitHash: 'a7f8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8',
    pushedGitBranch: 'feature/authentication',
    fileChanges: [
      {
        type: 'added',
        filePath: 'src/models/User.ts',
        diff: `export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel {
  static async create(userData: Partial<User>): Promise<User> {
    // Implementation details
    return {} as User;
  }

  static async findByEmail(email: string): Promise<User | null> {
    // Implementation details
    return null;
  }
}`
      },
      {
        type: 'added',
        filePath: 'src/routes/auth.ts',
        diff: `import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await UserModel.create({
      email,
      passwordHash
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

export default router;`
      },
      {
        type: 'modified',
        filePath: 'src/app.ts',
        diff: ` import express from 'express';
import cors from 'cors';
+import authRoutes from './routes/auth';
+import { authMiddleware } from './middleware/auth';

 const app = express();

 app.use(cors());
 app.use(express.json());

+app.use('/api/auth', authRoutes);
+
+// Protected route example
+app.get('/api/user/profile', authMiddleware, (req, res) => {
+  res.json({ user: req.user });
+});

 const PORT = process.env.PORT || 3000;`
      }
    ],
    commit: {
      hash: 'a7f8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8',
      author: 'John Doe',
      message: 'feat: implement user authentication system',
      timestamp: '2024-01-15 14:30:00',
      branch: 'feature/authentication'
    }
  },
  {
    id: 'TASK-002',
    description: 'Add responsive design for mobile devices',
    detailedReport: `Task Overview:
- Converted fixed-width layout to responsive design
- Added mobile-first CSS approach
- Implemented hamburger menu for navigation
- Optimized touch targets for mobile interaction

Technical Implementation:
- Added CSS Grid and Flexbox layouts
- Implemented CSS custom properties for consistent spacing
- Added viewport meta tag configuration
- Created responsive breakpoints

Mobile Enhancements:
- Touch-friendly button sizes (minimum 44px)
- Improved navigation with slide-out menu
- Optimized images for different screen sizes
- Added swipe gestures for carousel

Browser Support:
- Tested on iOS Safari, Chrome Mobile, Samsung Internet
- Fallbacks for older browsers implemented
- Progressive enhancement approach used

Performance:
- Minimized CSS file size by 30%
- Optimized images for mobile (WebP format)
- Reduced JavaScript bundle size through code splitting`,
    pushedGitHash: 'b9c8d7e6f5a4b3c2d1e0f9e8d7c6b5a4f3e2d1c0',
    pushedGitBranch: 'feature/mobile-responsive',
    fileChanges: [
      {
        type: 'added',
        filePath: 'src/styles/responsive.css',
        diff: `/* Mobile First Responsive Design */

:root {
  --mobile-breakpoint: 768px;
  --tablet-breakpoint: 1024px;
  --spacing-unit: 8px;
}

.container {
  width: 100%;
  max-width: 100%;
  padding: 0 var(--spacing-unit);
  margin: 0 auto;
}

@media (min-width: 768px) {
  .container {
    max-width: 750px;
    padding: 0 calc(2 * var(--spacing-unit));
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    padding: 0 calc(4 * var(--spacing-unit));
  }
}

.nav-menu {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: var(--bg-secondary);
  transition: left 0.3s ease;
  z-index: 1000;
}

.nav-menu.active {
  left: 0;
}

.hamburger {
  display: block;
  cursor: pointer;
}

@media (min-width: 768px) {
  .hamburger {
    display: none;
  }

  .nav-menu {
    position: static;
    left: auto;
    width: auto;
    height: auto;
  }
}`
      },
      {
        type: 'deleted',
        filePath: 'src/styles/fixed-layout.css',
        diff: `-.container {
-  width: 1200px;
-  margin: 0 auto;
-  padding: 20px;
-}
-
-.nav {
-  width: 100%;
-  height: 60px;
-  position: fixed;
-  top: 0;
-  left: 0;
-}`
      },
      {
        type: 'modified',
        filePath: 'index.html',
        diff: ` <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
+  <meta name="theme-color" content="#ffffff" />
+  <meta name="mobile-web-app-capable" content="yes" />
+  <meta name="apple-mobile-web-app-capable" content="yes" />
   <title>Coding Dashboard</title>
+  <link rel="manifest" href="/manifest.json" />`
      }
    ],
    commit: {
      hash: 'b9c8d7e6f5a4b3c2d1e0f9e8d7c6b5a4f3e2d1c0',
      author: 'Jane Smith',
      message: 'feat: add responsive design for mobile devices',
      timestamp: '2024-01-14 10:15:00',
      branch: 'feature/mobile-responsive'
    }
  },
  {
    id: 'TASK-003',
    description: 'Optimize database queries and add caching',
    detailedReport: `Performance Optimization Task:
- Analyzed slow database queries using EXPLAIN ANALYZE
- Added database indexes for frequently queried columns
- Implemented Redis caching layer
- Added query result caching with TTL

Database Improvements:
- Added composite index on (user_id, created_at)
- Optimized JOIN operations with proper indexing
- Implemented connection pooling
- Added query timeout limits

Caching Strategy:
- Redis for session storage and API response caching
- Cache invalidation on data updates
- Implemented cache-aside pattern
- Added cache warming for critical data

Performance Results:
- Query response time reduced by 75%
- Database load reduced by 60%
- API response times improved by 50%
- Memory usage optimized with proper cache sizing

Monitoring:
- Added query performance logging
- Implemented cache hit/miss metrics
- Database connection monitoring
- Performance alerts and dashboards`,
    pushedGitHash: 'c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9',
    pushedGitBranch: 'performance/database-optimization',
    fileChanges: [
      {
        type: 'renamed',
        filePath: 'src/services/optimizedDataService.ts',
        oldPath: 'src/services/oldDataService.ts',
        diff: `// Renamed to new optimized service
+import { cache } from '../cache/redis';
+import { QueryBuilder } from '../database/query-builder';

-class OldDataService {
+class OptimizedDataService {
   async getUserData(userId: string) {
-    const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
-    const posts = await db.query('SELECT * FROM posts WHERE user_id = ?', [userId]);
+    // Try cache first
+    const cacheKey = \`user_data:\${userId}\`;
+    const cached = await cache.get(cacheKey);
+
+    if (cached) {
+      return JSON.parse(cached);
+    }
+
+    // Use optimized queries with indexes
+    const user = await QueryBuilder.select('*')
+      .from('users')
+      .where('id = ?', [userId])
+      .execute();
+
+    const posts = await QueryBuilder.select('*')
+      .from('posts')
+      .where('user_id = ?', [userId])
+      .orderBy('created_at DESC')
+      .limit(20)
+      .execute();

     const result = { user, posts };
+
+    // Cache result for 5 minutes
+    await cache.set(cacheKey, JSON.stringify(result), 300);

     return result;
   }
 }`
      },
      {
        type: 'added',
        filePath: 'src/database/migrations/add_indexes.sql',
        diff: `-- Add indexes for performance optimization

-- Users table indexes
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_users_created_at ON users(created_at DESC);

-- Posts table indexes
CREATE INDEX CONCURRENTLY idx_posts_user_id_created_at ON posts(user_id, created_at DESC);
CREATE INDEX CONCURRENTLY idx_posts_status ON posts(status) WHERE status = 'published';

-- Comments table indexes
CREATE INDEX CONCURRENTLY idx_comments_post_id_created_at ON comments(post_id, created_at DESC);
CREATE INDEX CONCURRENTLY idx_comments_user_id ON comments(user_id);

-- Analytics table indexes
CREATE INDEX CONCURRENTLY idx_analytics_user_id_date ON analytics(user_id, date DESC);
CREATE INDEX CONCURRENTLY idx_analytics_event_type_date ON analytics(event_type, date DESC);

-- Composite indexes for common queries
CREATE INDEX CONCURRENTLY idx_posts_user_status ON posts(user_id, status);
CREATE INDEX CONCURRENTLY idx_comments_post_user ON comments(post_id, user_id);`
      }
    ],
    commit: {
      hash: 'c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9',
      author: 'Bob Wilson',
      message: 'perf: optimize database queries and add caching layer',
      timestamp: '2024-01-13 16:45:00',
      branch: 'performance/database-optimization'
    }
  }
];