# Harvest Protocol Pattern

## Intent
Extract valuable insights from creative flow sessions while preserving both distilled knowledge and complete context for future reference.

## Motivation
Flow sessions generate massive amounts of content:
- Stream-of-consciousness notes
- Multiple exploration paths
- Failed attempts
- Partial solutions
- Questions and uncertainties

Without a harvest process:
- Valuable insights get buried
- Context is lost
- Patterns aren't recognized
- Knowledge doesn't compound

The Harvest Protocol ensures we:
- Capture key insights while they're fresh
- Preserve full context for later reference
- Reset for the next creative session
- Build our knowledge repository

## Structure
```
Flow Content                    Harvest Output
├── Raw explorations      →     ├── Summaries → docs/unprocessed/
├── Failed attempts       →     └── Full Archive → git history
├── Questions raised      →     
├── Patterns noticed      →     Clean slate for next session
└── Decisions made        →
```

## Implementation

### 1. Review Flow Content
```bash
# On your flow branch
git log --oneline
git diff main...HEAD

# Review what was created
ls -la
cat *.md
```

### 2. Extract Key Insights
```bash
# Create summary in unprocessed
mkdir -p docs/unprocessed

cat > docs/unprocessed/2025-01-29-auth-insights.md << EOF
# Authentication Insights
*Harvested from flow/auth-exploration*
*Date: 2025-01-29*

## Key Discoveries
- JWT with refresh rotation solves our scaling needs
- WebAuthn could be future enhancement
- Session-based auth won't work for mobile

## Decisions Made
- Use RS256 for signing (not HS256)
- 15-minute access tokens
- 7-day refresh tokens with rotation

## Open Questions
- How to handle token revocation?
- Should we implement device tracking?

## Next Steps
- Implement JWT with refresh rotation
- Research revocation strategies
EOF
```

### 3. Commit Harvest Summary
```bash
git add docs/unprocessed/
git commit -m "Harvest: Authentication exploration insights"
```

### 4. Preserve Complete Context
```bash
# The flow branch itself becomes the archive
git push origin flow/auth-exploration

# Create PR to merge knowledge into main
# PR description should summarize what was learned
```

### 5. Clean Workspace
After PR is merged:
```bash
git checkout main
git pull
# Ready for next flow session
```

## Examples

### Harvesting a Complex Exploration
```bash
# After exploring API redesign for 3 hours
# flow/api-redesign has 47 commits, 23 files

# Create focused summary
cat > docs/unprocessed/2025-01-30-api-redesign.md << EOF
# API Redesign Insights

## Core Realization
Our current REST API is fighting the domain model.
GraphQL would align better with our tree structures.

## Evidence
- 7 endpoints do basically the same thing
- Clients make 5-10 calls for one operation  
- Version management is becoming painful

## Recommendation
Implement GraphQL layer over existing services

## See Full Exploration
flow/api-redesign branch for complete analysis
EOF

git add docs/unprocessed/
git commit -m "Harvest: API redesign exploration"
```

### Quick Harvest for Small Session
```bash
# After 30-minute performance investigation

echo "# Performance Fix: Index on user_id column" > \
  docs/unprocessed/2025-01-29-perf-fix.md
echo "Missing index caused full table scans" >> \
  docs/unprocessed/2025-01-29-perf-fix.md

git add docs/unprocessed/
git commit -m "Harvest: Performance investigation"
```

## Consequences

### Benefits
- **Dual preservation**: Summaries for daily use, archives for deep dives
- **Knowledge accumulation**: Unprocessed directory grows with insights
- **Clean workspace**: Each session starts fresh
- **Pattern recognition**: Reviewing helps spot patterns
- **Decision trail**: Can trace why choices were made

### Considerations  
- Requires discipline to harvest before starting new work
- Summarization is a skill that improves with practice
- Some insights only become clear during harvest
- Time investment pays off long-term

### Harvest Triggers
Harvest when:
- Flow session energy depletes
- Switching to different work
- End of day/week
- Major insight achieved
- Before starting implementation

## Related Patterns
- [Flow Branches](flow-branches.md) - Where exploration happens
- [Unprocessed Directory](../structure/unprocessed-directory.md) - Where summaries live
- [Knowledge First](../core/knowledge-first.md) - Why we preserve insights
- [Implementation Branches](implementation-branches.md) - Next step after harvest