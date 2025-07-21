---
type: trunk
id: pure-knowledge-main-branch
title: "Main branch must contain only knowledge, never code"
validated_roots:
  - knowledge-eternal-code-temporary
  - git-branches-for-knowledge
  - documentation-drives-development
priority: P0
status: validated
evidence:
  - "This repository successfully maintains knowledge-only main branch"
  - "Clear separation reduces confusion about source of truth"
  - "Documentation remains accurate without code changes"
---

# Requirement: Pure Knowledge Main Branch

## The Fundamental Rule

The main branch of an Organic Flow repository must contain ONLY knowledge artifacts - never implementation code.

## What Belongs in Main

### YES - Knowledge Artifacts
- **Seeds**: Problem and opportunity documentation
- **Roots**: Assumption and hypothesis documentation  
- **Trunks**: Validated requirements (like this document)
- **Knowledge**: Harvested insights from experiments
- **Registries**: YAML/JSON tracking of implementations
- **Guides**: How-to and conceptual documentation
- **Diagrams**: Architecture and flow visualizations

### NO - Implementation Artifacts
- Source code (any language)
- Build configurations
- Deployment scripts
- Dependencies/packages
- Compiled binaries
- Test code
- CI/CD pipelines

## Why This Is Required

### Single Source of Truth
When main contains only knowledge:
- No confusion about what's authoritative
- Knowledge doesn't compete with code
- Clear hierarchy of information
- Documentation can't be "outdated"

### Knowledge Persistence
When code is excluded:
- Deleting implementations doesn't lose knowledge
- Failed experiments still contribute insights
- Understanding accumulates over time
- History shows knowledge evolution

### Clean Mental Model
When separation is absolute:
- "What should we build?" → Check main
- "How did we build it?" → Check experiments
- "What's in production?" → Check releases
- "What did we learn?" → Check knowledge

## Implementation Details

### Repository Structure
```
main/
├── seeds/                      # Problems to solve
├── roots/                      # Assumptions to validate
├── trunks/                     # Requirements like this
├── knowledge/                  # Harvested learnings
├── guides/                     # How-to documentation
├── implementations.yaml        # Registry of all attempts
├── README.md                   # Repository overview
└── .gitignore                  # Prevents code in main
```

### The .gitignore Strategy
The main branch .gitignore should block all code:
```gitignore
# Block all source code
*.js *.ts *.py *.go *.java *.rb *.php
*.c *.cpp *.rs *.swift *.kt *.scala

# Block build artifacts
/bin /build /dist /target
*.exe *.dll *.so *.dylib

# Block package files
package.json go.mod Cargo.toml
Gemfile requirements.txt pom.xml

# Allow only documentation
!*.md !*.yaml !*.yml !*.txt
```

### Enforcement Mechanisms

#### Pre-commit Hooks
Check that no code files are being added to main:
```bash
#!/bin/bash
# Check if on main branch
if [ "$(git branch --show-current)" = "main" ]; then
  # Check for code files
  if git diff --cached --name-only | grep -E '\.(js|ts|py|go|java)$'; then
    echo "ERROR: Cannot commit code files to main branch"
    exit 1
  fi
fi
```

#### CI/CD Validation
Automated checks that main contains no code:
```yaml
- name: Validate Pure Knowledge
  run: |
    if find . -name "*.js" -o -name "*.py" -o -name "*.go" | grep -q .; then
      echo "ERROR: Code files found in main branch"
      exit 1
    fi
```

## Working with Pure Knowledge

### Starting New Work
1. Document the problem in seeds/
2. Document assumptions in roots/
3. Get review and validation
4. Create experiment branch for implementation
5. Never add code to main

### Harvesting Knowledge
1. Create harvest branch from main
2. Add only knowledge updates
3. Reference experiment branch
4. Submit PR to main
5. Knowledge merges, code doesn't

### Reading the Repository
- Main branch is always readable
- No technical knowledge required
- Concepts explained clearly
- Implementation details elsewhere

## Benefits Realized

### For Developers
- Clear what to build
- No confusion about requirements
- Easy to see all attempts
- Knowledge compounds

### For Stakeholders
- Can read main without technical knowledge
- See what problems are being solved
- Understand evolution of thinking
- Track experiment outcomes

### For Future Teams
- Complete knowledge preserved
- Can understand all decisions
- Learn from past attempts
- Build on accumulated wisdom

## Success Criteria Validation

✅ **No code in main**: Enforced by .gitignore and hooks
✅ **Knowledge accessible**: All in markdown/YAML
✅ **Clear navigation**: Folder structure tells story
✅ **Version controlled**: Full history of knowledge evolution

## Related Trunks
- [experiment-branch-lifecycle](experiment-branch-lifecycle.md)
- [harvest-protocol-required](harvest-protocol-required.md)
- [implementation-registry-spec](implementation-registry-spec.md)