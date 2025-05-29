# Flow Branches Pattern

## Intent
Use git branches prefixed with `flow/` to create isolated spaces for creative exploration and knowledge capture without the pressure of producing working code.

## Motivation
Traditional feature branches focus on code changes, creating pressure to:
- Produce working implementations
- Keep commits "clean"
- Avoid exploratory tangents
- Hide messy thinking

Flow branches invert this by:
- Celebrating exploration
- Capturing thought processes
- Preserving failed attempts (they teach us)
- Making knowledge evolution visible

## Structure
```
flow/
├── flow/2025-01-29-auth-exploration
├── flow/2025-01-29-performance-ideas  
├── flow/2025-01-30-refactor-thoughts
└── flow/api-redesign-musings
```

Branch naming: `flow/YYYY-MM-DD-description` or `flow/description`

## Implementation

### 1. Start a Flow Session
```bash
# Create a new flow branch
git checkout -b flow/2025-01-29-auth-exploration

# Or simpler naming
git checkout -b flow/auth-ideas
```

### 2. Capture Everything
```bash
# Stream of consciousness
echo "# Auth Exploration" > auth-thoughts.md
echo "What if we used OAuth instead?" >> auth-thoughts.md

# Failed attempts are valuable
echo "## Tried Sessions - Didn't Scale" > failed-attempts.md

# Diagrams, pseudocode, questions
echo "## Questions" > open-questions.md
```

### 3. Commit Freely
```bash
# Messy commits are fine in flow branches
git add .
git commit -m "Exploring OAuth option"
git commit -m "Wait, what about WebAuthn?"
git commit -m "Drawing architecture diagram"
```

### 4. No Code Pressure
Flow branches are for understanding, not implementation:
- Pseudocode over working code
- Questions over answers
- Exploration over completion

## Examples

### Exploring Authentication Options
```bash
git checkout -b flow/auth-exploration

# Create exploration files
cat > exploration.md << EOF
# Authentication Exploration

## Options Considered
1. JWT - Stateless, scalable
2. Sessions - Simple, stateful
3. OAuth - Delegate to providers
4. WebAuthn - Passwordless future

## Deep Dive: JWT
- How do we handle refresh?
- Revocation strategies?
- Key rotation?
EOF

git add exploration.md
git commit -m "Exploring auth options"
```

### Performance Investigation
```bash
git checkout -b flow/2025-01-30-slow-queries

# Document findings as you go
echo "# Performance Investigation" > findings.md
echo "- Query X takes 2.3s" >> findings.md
echo "- Seems to be N+1 problem" >> findings.md
echo "- Could we denormalize?" >> findings.md

# Include failed solutions
echo "## Tried caching - didn't help" > failed-attempts.md
```

## Consequences

### Benefits
- **Safe exploration**: No fear of breaking things
- **Thought preservation**: Capture reasoning process
- **Learning from failures**: Failed attempts teach
- **Knowledge evolution**: See how understanding developed
- **Context for decisions**: Why we chose what we chose

### Considerations
- Flow branches can become messy (that's okay!)
- Need discipline to harvest insights
- May accumulate many branches (archive old ones)
- Different merge strategy than feature branches

### Flow vs Feature Branches
```
Flow Branch:                    Feature Branch:
- Knowledge focused            - Code focused
- Exploration encouraged       - Implementation required
- Messy commits fine          - Clean history expected
- May not have working code   - Must have working code
- Preserves journey           - Shows destination
```

## Related Patterns
- [Harvest Protocol](harvest-protocol.md) - Extract insights from flow branches
- [Implementation Branches](implementation-branches.md) - Generate code after understanding
- [PR as Review](pr-as-review.md) - Review knowledge, not just code
- [Unprocessed Directory](../structure/unprocessed-directory.md) - Where flow insights land