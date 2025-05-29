# Implementation Branches Pattern

## Intent
Use git branches prefixed with `impl/` to generate code from crystallized knowledge, maintaining clear lineage between understanding and implementation.

## Motivation
After flow exploration and knowledge harvest, we need to:
- Generate working code from understanding
- Track what knowledge created which code
- Maintain implementation history
- Enable fresh regeneration
- Separate exploration from building

Implementation branches provide:
- Clear knowledge-to-code lineage
- Focused building without exploration pressure
- Regeneration tracking
- Clean PR history

## Structure
```
impl/
├── impl/auth-jwt           # From auth exploration knowledge
├── impl/user-service       # From user management decisions  
├── impl/api-graphql        # From API redesign insights
└── impl/fix-rate-limit     # From performance analysis
```

## Implementation

### 1. Create Implementation Branch
```bash
# After harvesting knowledge
git checkout main
git pull
git checkout -b impl/auth-jwt

# Branch name indicates what's being implemented
# NOT how (that's in the knowledge docs)
```

### 2. Reference Source Knowledge
```bash
# First commit: Link to knowledge
cat > IMPLEMENTATION_CONTEXT.md << EOF
# Implementation Context

This implementation is based on:
- docs/unprocessed/2025-01-29-auth-decision.md
- docs/unprocessed/2025-01-29-jwt-strategy.md

Key decisions:
- JWT with RS256 signing
- 15-minute access tokens  
- Refresh token rotation
EOF

git add IMPLEMENTATION_CONTEXT.md
git commit -m "Context: Auth implementation from JWT decision"
```

### 3. Generate Code from Knowledge
```bash
# Using AI assistance
echo "Based on docs/unprocessed/2025-01-29-auth-decision.md, 
implement JWT auth with refresh rotation" | ai-assist

# Or manual implementation following decisions
mkdir -p src/auth
# Implement based on documented understanding
```

### 4. Include Knowledge References
```javascript
// src/auth/jwt.js
/**
 * JWT Authentication Implementation
 * Based on: docs/unprocessed/2025-01-29-auth-decision.md
 * 
 * Key decisions:
 * - RS256 for signing (not HS256) for security
 * - 15-minute access tokens for limiting exposure
 * - Refresh rotation to prevent token hijacking
 */
```

### 5. PR Shows Knowledge and Code
```markdown
# PR Description
## Implementation of JWT Authentication

Based on knowledge from:
- flow/auth-exploration (2 days of exploration)
- docs/unprocessed/2025-01-29-auth-decision.md

This implements the decisions we made about:
- Stateless authentication for microservices
- Mobile-friendly token strategy
- Security through rotation

## Code Generated
- src/auth/jwt.js - Token generation
- src/auth/refresh.js - Rotation logic
- src/middleware/auth.js - Request validation
```

## Examples

### Simple Implementation
```bash
# After exploring performance issue
git checkout -b impl/add-user-index

# Link to knowledge
echo "Based on: docs/unprocessed/2025-01-29-perf-analysis.md" > context.md
echo "Missing index on users.email causing full scans" >> context.md

# Generate migration
echo "CREATE INDEX idx_users_email ON users(email);" > migrations/add-email-index.sql

git add .
git commit -m "Add email index from perf analysis"
```

### Complex Implementation
```bash
git checkout -b impl/api-graphql

# Document the transformation
cat > IMPLEMENTATION_PLAN.md << EOF
# GraphQL API Implementation

From knowledge in:
- docs/unprocessed/api-redesign-insights.md
- docs/decisions/graphql-over-rest.md

Implementation phases:
1. Schema definition from domain model
2. Resolver generation from patterns
3. Migration strategy from REST
EOF

# Implement in clear phases
git add schema/
git commit -m "GraphQL schema from domain model"

git add resolvers/
git commit -m "Resolvers from identified patterns"
```

## Consequences

### Benefits
- **Clear lineage**: Know why code exists
- **Confident building**: Decisions already made
- **Easy regeneration**: Knowledge preserved
- **Better PRs**: Review includes context
- **No exploration pressure**: Just build

### Considerations
- Requires harvested knowledge first
- More branches to manage
- Need discipline to link knowledge
- Different from feature branches
- May feel like overhead initially

### Implementation vs Flow Branches
```
Implementation Branch:          Flow Branch:
- Building focused             - Exploration focused
- Has clear requirements       - Requirements emerging
- Links to decisions           - Creating decisions
- Generates code               - Generates understanding
- Clean, purposeful commits    - Messy, experimental commits
```

### Signs of Good Implementation Practice
- Every impl links to knowledge
- Code comments reference decisions
- PRs tell the full story
- Regeneration is possible
- No surprise requirements

## Related Patterns
- [Flow Branches](flow-branches.md) - Where knowledge comes from
- [Harvest Protocol](harvest-protocol.md) - Creates implementation sources
- [Regeneration](../core/regeneration.md) - Why this approach works
- [PR as Review](pr-as-review.md) - Knowledge + code review