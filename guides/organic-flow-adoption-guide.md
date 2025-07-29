# Organic Flow Adoption Guide

*Created: 2025-07-29*
*Context: How to integrate Organic Flow with existing repositories and workflows*

## The Core Promise

Organic Flow isn't a replacement for your current workflow - it's an enhancement that adds knowledge management to your existing process. You can adopt it gradually without disrupting your team.

## Three Integration Strategies

### Strategy 1: Parallel Knowledge Branch

Keep your existing workflow unchanged, add a knowledge branch alongside:

```
main ─────── develop ─────── feature/search
 │                               │
 │                          (normal PR)
 │
knowledge ─────── learnings/search
      ↑               │
      └── Knowledge PR
```

**Pros**: 
- Zero disruption to existing workflow
- Clear separation of concerns
- Easy to try and remove if needed

**Cons**:
- Requires switching branches for documentation
- May feel like extra work initially

### Strategy 2: Embedded Knowledge

Add knowledge artifacts directly in your existing branches:

```
your-repo/
├── src/                    # existing code
├── tests/                  # existing tests
├── docs/                   # existing docs
└── .knowledge/             # NEW
    ├── experiments.yaml
    ├── learnings/
    ├── patterns/
    └── constraints/
```

**Pros**:
- Knowledge lives with code
- No branch switching
- Natural for developers

**Cons**:
- Mixes knowledge with implementation
- Harder to see knowledge evolution

### Strategy 3: Companion Repository

Maintain a separate knowledge repository:

```
my-app/              # existing repo with GitFlow
my-app-knowledge/    # new Organic Flow repo
    ├── inputs/
    ├── hypotheses/
    ├── learnings/
    └── experiments.yaml
```

**Pros**:
- Complete separation
- Can adopt different review processes
- Knowledge repo can serve multiple code repos

**Cons**:
- Context switching between repos
- Need to maintain linkage

## Mapping Your Existing Workflow

### GitFlow → Organic Flow

| GitFlow Branch | Organic Flow Equivalent | Purpose |
|---------------|------------------------|---------|
| feature/* | experiment/* or impl/* | Test ideas or build features |
| hotfix/* | experiment/hotfix-* | Quick fixes that still produce learning |
| release/* | release/* | Production-ready code |
| develop | - | Not needed; knowledge branch serves as integration point |
| main/master | main | If using Strategy 1, remains unchanged |

### GitHub Flow → Organic Flow

| GitHub Flow | Organic Flow Addition | Purpose |
|-------------|---------------------|---------|
| feature branch | + hypothesis doc | Document what you're trying |
| PR to main | + Knowledge PR | Extract learnings |
| Deploy | + patterns update | Document what worked |

## Gradual Adoption Path

### Phase 1: Just Add Knowledge (Weeks 1-4)

Start capturing knowledge without changing anything else:

```bash
# In your existing repo
mkdir -p .knowledge/learnings

# After fixing a bug
echo "## What we learned from the login bug" > .knowledge/learnings/login-bug.md
echo "Root cause: Session cookies expired..." >> .knowledge/learnings/login-bug.md

# Commit alongside your fix
git add .
git commit -m "Fix login bug and document learnings"
```

### Phase 2: Knowledge PRs (Weeks 5-8)

Add a simple PR template section:

```markdown
## Knowledge Extraction
- **What worked**: 
- **What didn't work**: 
- **Constraints discovered**: 
- **Would do differently**: 
```

Team starts expecting knowledge with code changes.

### Phase 3: Hypothesis Before Coding (Weeks 9-12)

Before starting features:

```bash
# Before creating feature branch
echo "## Hypothesis: Caching will improve search" > .knowledge/hypotheses/search-cache.md
echo "If we add Redis caching..." >> .knowledge/hypotheses/search-cache.md

# Then create feature branch
git checkout -b feature/search-cache
```

### Phase 4: Full Organic Flow (Week 13+)

- Use experiment/* for quick tests
- Use impl/* for features
- Knowledge PRs are standard
- Patterns guide new development

## The Wrapper Approach

### Simple Git Aliases

Add to `.gitconfig`:

```bash
[alias]
    # Start experiment with hypothesis
    experiment = "!f() { \
        git checkout -b experiment/$1 && \
        echo \"## Hypothesis: $2\" > .knowledge/hypotheses/$1.md; \
    }; f"
    
    # Finish with knowledge extraction
    finish-experiment = "!f() { \
        echo 'What did you learn?' && \
        read learning && \
        echo \"## Learning: $learning\" >> .knowledge/learnings/$(git branch --show-current).md && \
        git add .knowledge/ && \
        git commit -m \"Extract learnings from $(git branch --show-current)\"; \
    }; f"
```

Usage:
```bash
git experiment "redis-cache" "Caching will improve performance"
# ... develop ...
git finish-experiment
```

### Advanced: `of-git` Wrapper

A dedicated tool that wraps git:

```bash
# Initialize Organic Flow in existing repo
of-git init --strategy=parallel

# Create feature with hypothesis
of-git feature start search-v2
> What problem are you solving? Users can't find products
> What's your hypothesis? Elasticsearch will provide <500ms search

# Finish feature with extraction
of-git feature finish search-v2
> What worked? ES gave us 200ms searches
> What didn't? Memory usage 3x higher than expected
> Creating Knowledge PR...
```

## Configuration File

### `.organicflow.yml`

```yaml
# Organic Flow configuration
version: 1
strategy: parallel  # or 'embedded' or 'companion'

# Map your branches to OF concepts
mapping:
  experiment_patterns:
    - spike/*
    - poc/*
    - experiment/*
  implementation_patterns:
    - feature/*
    - feat/*
    - story/*
  
# Knowledge management
knowledge:
  branch: knowledge  # or 'main' if dedicated
  require_pr: true
  auto_template: true
  
# Integration features
integration:
  wrap_gitflow: true
  require_hypothesis: false  # true for stricter process
  extract_on_merge: true    # prompt for knowledge on PR merge
  
# Templates
templates:
  hypothesis: .knowledge/templates/hypothesis.md
  learning: .knowledge/templates/learning.md
  pattern: .knowledge/templates/pattern.md
```

## For Different Team Sizes

### Solo Developer
- Use embedded strategy (.knowledge/ folder)
- Simple git aliases
- Focus on capturing surprises

### Small Team (2-10)
- Parallel branch strategy
- Knowledge PRs for features
- Weekly knowledge review

### Large Team (10+)
- Companion repository
- Dedicated knowledge reviewers
- Automated knowledge CI/CD

## Common Concerns and Solutions

### "This seems like extra work"

Start with just capturing surprises:
- "Weird, Redis crashed at exactly 10k connections"
- "TIL: Safari handles cookies differently"
- "Note: This query gets slow with >6 JOINs"

These natural observations are valuable knowledge.

### "My team won't adopt this"

1. Start yourself, lead by example
2. Share when knowledge helps solve problems
3. Make it lightweight initially
4. Show the compound value over time

### "We have compliance requirements"

Knowledge can be reviewed separately from code:
- Code PR: Technical review
- Knowledge PR: Accuracy review
- Different reviewers if needed

### "We use [other workflow]"

Organic Flow principles work with any workflow:
- Capture inputs (problems, ideas)
- Document hypotheses
- Extract learnings
- Build on patterns

The branch names don't matter; the knowledge capture does.

## Success Metrics

Track adoption success:

```bash
# Simple metrics
echo "## OF Adoption Metrics - $(date)" > .knowledge/metrics.md
echo "Knowledge files: $(find .knowledge -name '*.md' | wc -l)" >> .knowledge/metrics.md
echo "Patterns documented: $(ls .knowledge/patterns | wc -l)" >> .knowledge/metrics.md
echo "Experiments run: $(git branch -r | grep -c experiment/)" >> .knowledge/metrics.md
```

Success indicators:
- Fewer repeated mistakes
- Faster onboarding
- More "I remember we tried that" moments
- Increased pattern reuse

## Migration Examples

### From Pure GitFlow

Week 1:
```bash
git flow feature start new-search
# ... develop normally ...
git flow feature finish new-search
```

Week 5 (add knowledge):
```bash
git flow feature start new-search
echo "Trying Elasticsearch for search" > .knowledge/experiments/new-search.md
# ... develop ...
echo "ES worked but needs 3 nodes" >> .knowledge/experiments/new-search.md
git flow feature finish new-search
```

Week 13 (full integration):
```bash
of-git feature start new-search --hypothesis "ES will scale better"
# ... develop with knowledge tracking ...
of-git feature finish new-search --extract-learnings
```

### From Trunk-Based Development

Before:
```bash
git checkout -b fix-search
# quick fix
git merge main
```

After:
```bash
git checkout -b experiment/fix-search
echo "## Quick fix: Increase timeout" > .knowledge/quick/fix-search.md
# quick fix
echo "Worked but not root cause" >> .knowledge/quick/fix-search.md
git merge main
```

## The Path Forward

1. **Today**: Create `.knowledge/` folder
2. **This Week**: Document one learning
3. **This Month**: Try Knowledge PR
4. **This Quarter**: See compound benefits
5. **This Year**: Transform how your team learns

Remember: Perfect is the enemy of good. Start small, capture what surprises you, and let the value compound over time.