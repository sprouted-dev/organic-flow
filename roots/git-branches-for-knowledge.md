---
type: root
id: git-branches-for-knowledge
assumption: "Git branches can effectively separate eternal knowledge from temporary code"
tests_seeds:
  - code-knowledge-confusion
  - multiple-implementations-chaos
validation_method: "Implement branching strategy and measure clarity"
success_criteria:
  - "Clear which branch contains what"
  - "No code ever in main branch"
  - "Easy to find all experiments"
  - "Knowledge merges without conflicts"
status: testing
experiments:
  - organic-flow-repo-structure
---

# Assumption: Git Branches for Knowledge Management

## The Architectural Hypothesis

We believe git's branching model, designed for code versioning, can be repurposed for knowledge management by using branches to separate concerns rather than versions.

## Reconceptualizing Git

### Traditional Git Usage
- Branches for features/versions
- Main contains production code
- Merges combine code changes
- History tracks code evolution

### Our Proposed Usage
- Branches for experiment isolation
- Main contains only knowledge
- Merges extract learnings
- History tracks understanding evolution

## Why This Could Work

### Git's Strengths Align
Git already provides:
- **Isolation**: Branches don't interfere
- **History**: Complete audit trail
- **Merging**: Selective integration
- **Distribution**: Decentralized copies
- **Tooling**: Extensive ecosystem

We just use these differently.

### Conceptual Clarity
Branch names tell a story:
- `main` = What we know to be true
- `experiment/*` = What we're testing
- `release/*` = What actually works
- `harvest/*` = Knowledge being extracted

No confusion about purpose.

### Natural Workflows
Git workflows map to knowledge workflows:
- Create branch → Start experiment
- Commit → Document progress
- PR → Propose knowledge update
- Merge → Accept learning
- Tag → Mark validated knowledge

## The Branch Architecture

### Main Branch: Pure Knowledge
```
main/
├── seeds/          # Problems discovered
├── roots/          # Assumptions to test
├── trunks/         # Validated requirements
├── knowledge/      # Harvested insights
└── implementations.yaml
```
**Rule**: No code ever. Knowledge only.

### Experiment Branches: Testing Grounds
```
experiment/auth-jwt/
├── branches/       # Technical approach
├── code/          # Actual implementation
├── HYPOTHESIS.md  # What we're testing
└── RESULTS.md     # What we learned
```
**Rule**: Code lives here. Time-boxed.

### Release Branches: Production Snapshots
```
release/v2.1/
├── [all production code]
├── RELEASE.md     # What's included
└── TRUNK-LINKS.md # Requirements satisfied
```
**Rule**: Promoted experiments only.

### Harvest Branches: Knowledge PRs
```
harvest/auth-insights/
├── roots/         # Updated assumptions
├── knowledge/     # New insights
└── NO CODE        # Knowledge only
```
**Rule**: Merges to main only.

## Testing This Approach

### Experiment 1: This Repository
- Implement branch structure
- Maintain for 3 months
- Measure confusion incidents
- Track knowledge accumulation

### Experiment 2: Tool Development
- Build tools in experiment branches
- Extract patterns to main
- Measure reuse across experiments

### Success Metrics
1. **Navigation Clarity**: Can people find what they need?
2. **Merge Conflicts**: Do knowledge updates conflict?
3. **Branch Proliferation**: Does it stay manageable?
4. **Tool Compatibility**: Do existing tools work?

## Potential Challenges

### Challenge 1: Branch Explosion
- Many experiments could create many branches
- Mitigation: Clear lifecycle, regular cleanup

### Challenge 2: Tool Assumptions
- Git tools assume code in main
- Mitigation: Configuration, custom tooling

### Challenge 3: Mental Model Shift
- Developers expect code in main
- Mitigation: Clear documentation, onboarding

## Expected Benefits

### Clear Separation
- Never confuse knowledge with implementation
- One source of truth (main)
- Multiple valid implementations

### Natural Experiment Lifecycle
- Branch creation = experiment start
- Branch activity = experiment progress
- Harvest PR = knowledge extraction
- Branch archive = experiment end

### Knowledge Preservation
- Failed experiments remain in history
- Lessons merged to main
- Implementation details available if needed

### Clean Repository
- Main branch is readable documentation
- Experiments isolated from each other
- Releases clearly marked

## How This Addresses Seeds

### Solves Multiple Implementation Chaos
- Clear registry in main
- Each implementation in its own branch
- Status obvious from branch name
- No confusion about what's current

### Enables Knowledge Preservation
- Harvest branches extract learning
- Knowledge lives forever in main
- Code can be archived/deleted
- History preserves context

## Related Roots
- [documentation-drives-development](documentation-drives-development.md)
- [harvest-protocol-required](harvest-protocol-required.md)
- [experiment-branch-lifecycle](experiment-branch-lifecycle.md)