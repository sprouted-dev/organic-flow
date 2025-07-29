# Organic Flow: Knowledge-First Development

This repository demonstrates Organic Flow methodology - a development approach where knowledge is primary and code is secondary. It serves as both documentation and a living example of the methodology in practice.

## What is Organic Flow?

Organic Flow inverts traditional software development: instead of code being the source of truth with documentation as an afterthought, knowledge becomes primary and code becomes one possible implementation of that knowledge.

### Core Principles

1. **Knowledge is eternal, code is temporary** - Understanding persists while implementations change
2. **Main branch contains only knowledge** - No code in the primary branch, ever
3. **All experiments produce learning** - Failed attempts are as valuable as successes
4. **Harvest knowledge systematically** - Extract insights through structured Knowledge PRs

## Repository Structure

This repository follows Organic Flow principles:

```
main/ (knowledge only)
├── inputs/                    # Starting points
│   ├── problems/             # Issues to solve
│   ├── ideas/                # Possibilities to explore
│   └── observations/         # Patterns noticed
├── assumptions/              # Hypotheses to test
├── specifications/           # Validated requirements
├── learnings/               # Harvested insights
├── patterns/                # Reusable solutions
├── knowledge/               # Deep understanding
├── guides/                  # How-to documentation
└── experiments.yaml         # Registry of all attempts
```

### Branch Strategy

- `main` - Knowledge only, no code ever
- `experiment/*` - Quick tests of specific hypotheses (hours to days)
- `impl/*` - Implementation attempts with intent to ship (days to weeks)
- `release/*` - Production-ready code (promoted from successful impl/)

## Getting Started

### For New Users

1. Start with [guides/organic-flow-clarity-first.md](guides/organic-flow-clarity-first.md) - Core concepts without jargon
2. Review [guides/organic-flow-visual-overview.md](guides/organic-flow-visual-overview.md) - See the flow visually
3. Follow [guides/organic-flow-practical-guide.md](guides/organic-flow-practical-guide.md) - Step-by-step implementation

### For Teams Using Git Flow

See [guides/organic-flow-adoption-guide.md](guides/organic-flow-adoption-guide.md) for integration strategies that work with your existing workflow.

## The Knowledge Flow

1. **Capture Inputs** - Document problems, ideas, and observations
2. **Form Assumptions** - State what you think will work
3. **Run Experiments** - Test assumptions in isolated branches
4. **Harvest Knowledge** - Extract learnings via Knowledge PRs
5. **Apply Understanding** - Use patterns in future work

## Key Concepts

### Experiments vs Implementations

Both test ideas but differ in scope:
- **Experiments**: Quick, focused tests of single hypotheses
- **Implementations**: Larger efforts with intent to ship, may spawn sub-experiments

### Knowledge PRs

The mechanism for extracting learning from code. See [guides/organic-flow-knowledge-pr.md](guides/organic-flow-knowledge-pr.md) for templates and examples.

### The Harvest

The process of extracting reusable knowledge from experiments. Every experiment, whether successful or failed, must be harvested before closure.

### Knowledge Types

Harvest produces different types of knowledge artifacts. See [guides/organic-flow-knowledge-types.md](guides/organic-flow-knowledge-types.md) for detailed explanations of:
- **Inputs**: Starting points (problems, ideas, observations)
- **Assumptions**: Hypotheses to test
- **Specifications**: Validated requirements
- **Learnings**: Specific discoveries
- **Patterns**: Reusable solutions
- **Knowledge**: Deep understanding

## Why Organic Flow?

### Problems It Solves

- **Knowledge loss** when developers leave or code is deleted
- **Repeated mistakes** from not capturing learnings
- **Documentation drift** when docs chase code changes
- **Onboarding friction** from implicit knowledge

### Benefits Realized

- **Compound learning** - Each experiment builds on previous insights
- **Clear thinking** - Must articulate problems before coding
- **Valuable failures** - Failed experiments produce insights
- **Living documentation** - Always accurate, never outdated

## Contributing

This repository accepts contributions via Organic Flow:

1. Document your input (problem/idea) in `inputs/`
2. State your assumption in `assumptions/`
3. Create an experiment branch
4. Submit a Knowledge PR with learnings

## Learn More

- **Conversational Documentation**: [guides/organic-flow-conversation-layer.md](guides/organic-flow-conversation-layer.md)
- **Knowledge vs Implementation**: [knowledge/implementation-spectrum.md](knowledge/implementation-spectrum.md)
- **Example Specifications**: Browse `specifications/` for validated patterns

## Living Example

This repository itself follows Organic Flow. Browse the git history to see how knowledge accumulates over time while implementation details remain in experiment branches.

---

*Organic Flow: Because understanding is more valuable than code.*