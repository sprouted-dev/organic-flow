# Directory Structure Pattern

## Intent
Establish a simple, consistent directory structure that supports knowledge accumulation and natural workflow while using standard tools.

## Motivation
Traditional project structures focus on code organization:
- src/ for source code
- tests/ for test files  
- docs/ for documentation
- build/ for artifacts

Organic Flow needs structure that:
- Prioritizes knowledge preservation
- Supports flow states
- Enables easy harvesting
- Works with git naturally
- Stays simple and memorable

## Structure
```
project/
├── docs/
│   ├── unprocessed/      # Knowledge accumulation (gold mine)
│   ├── decisions/        # Crystallized technical decisions
│   └── patterns/         # Recognized patterns
├── implementation/
│   ├── current/          # Active implementation context
│   └── sessions/         # Implementation history
├── .gitignore           # Include .flow/
└── [code directories]    # Language-specific structure
```

During flow states, a temporary directory appears:
```
.flow/                   # Temporary exploration space (git ignored)
└── archives/            # Preserved flow sessions
```

## Implementation

### 1. Initial Setup
```bash
# Create Organic Flow structure
mkdir -p docs/{unprocessed,decisions,patterns}
mkdir -p implementation/{current,sessions}

# Add .flow to .gitignore
echo ".flow/" >> .gitignore
echo "!.flow/archives/" >> .gitignore

git add .
git commit -m "Initialize Organic Flow structure"
```

### 2. Directory Purposes

**docs/unprocessed/**
- Raw insights from flow sessions
- Harvested knowledge
- Unrefined observations
- The "gold mine" of regeneration

**docs/decisions/**
- Architectural Decision Records (ADRs)
- Technology choices
- Design decisions
- Crystallized from unprocessed

**docs/patterns/**
- Recognized patterns
- Reusable solutions
- Team conventions
- Emerged from practice

**implementation/current/**
- Active implementation context
- Current sprint/focus
- Working specifications
- Bridge between knowledge and code

**implementation/sessions/**
- Implementation history
- What was built when
- Knowledge-to-code lineage
- Timestamp-based subdirectories

**.flow/** (temporary)
- Active exploration space
- Messy, unorganized thoughts
- Deleted after harvest
- Never committed

## Examples

### After Initial Setup
```
my-project/
├── docs/
│   ├── unprocessed/      # Empty, waiting for insights
│   ├── decisions/        # Empty, no decisions yet
│   └── patterns/         # Empty, patterns will emerge
├── implementation/
│   ├── current/          # Empty, no active implementation
│   └── sessions/         # Empty, no sessions yet
├── .gitignore           # Contains .flow/
└── README.md
```

### After First Week
```
my-project/
├── docs/
│   ├── unprocessed/
│   │   ├── 2025-01-29-auth-insights.md
│   │   ├── 2025-01-30-api-exploration.md
│   │   └── 2025-01-31-performance-findings.md
│   ├── decisions/
│   │   └── 001-use-jwt-auth.md
│   └── patterns/
│       └── retry-with-backoff.md
├── implementation/
│   ├── current/
│   │   ├── vision.md
│   │   └── tasks.md
│   └── sessions/
│       └── 2025-01-31-auth-implementation/
│           ├── context.md
│           └── generated/
├── src/                  # Code emerged from knowledge
│   └── auth/
└── .flow/               # Current exploration (if active)
```

### Language-Specific Additions
```
# JavaScript/TypeScript project
project/
├── docs/                # Organic Flow structure
├── implementation/
├── src/                 # Source code
├── tests/              # Test files
└── package.json

# Go project  
project/
├── docs/                # Organic Flow structure
├── implementation/
├── cmd/                # Commands
├── internal/           # Internal packages
└── go.mod

# Python project
project/
├── docs/                # Organic Flow structure  
├── implementation/
├── src/                # Source code
├── tests/              # Tests
└── pyproject.toml
```

## Consequences

### Benefits
- **Simple to remember**: Few directories, clear purposes
- **Knowledge-focused**: Docs prominent, not hidden
- **Git-friendly**: Works with standard workflows
- **Language-agnostic**: Adapts to any tech stack
- **Growth-ready**: Structure handles scaling naturally

### Considerations
- Different from typical project structures
- Team needs explanation initially
- Some tools expect different layouts
- May need mapping for CI/CD
- Keep language conventions where sensible

### Anti-patterns to Avoid
- Don't create complex hierarchies
- Don't mix code with knowledge docs
- Don't commit .flow/ contents directly
- Don't skip the harvest to unprocessed/
- Don't let implementation/ become a dumping ground

## Related Patterns
- [Unprocessed Directory](unprocessed-directory.md) - The knowledge goldmine
- [Flow Branches](../workflow/flow-branches.md) - Temporary exploration
- [Harvest Protocol](../workflow/harvest-protocol.md) - Fills the structure
- [Temporal Organization](temporal-organization.md) - Time-based structure