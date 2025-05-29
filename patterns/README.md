# Organic Flow Pattern Library

This pattern library documents the core patterns of Organic Flow Development, organized into clear layers from fundamental principles to practical implementation.

## Pattern Categories

### 1. Core Patterns (Philosophy)
The fundamental principles that define Organic Flow:
- [Knowledge First](core/knowledge-first.md) - Knowledge is primary, code is derivative
- [Organic Development](core/organic-development.md) - Software development is organic, not mechanical
- [Regeneration](core/regeneration.md) - Rebuild from understanding, not copy from code
- [Temporal Integrity](core/temporal-integrity.md) - Timestamp everything for ground truth

### 2. Workflow Patterns
The essential practices using standard tools:
- [Flow Branches](workflow/flow-branches.md) - Knowledge exploration in git
- [Implementation Branches](workflow/implementation-branches.md) - Code generation from knowledge
- [Harvest Protocol](workflow/harvest-protocol.md) - Extract and preserve insights
- [PR as Review](workflow/pr-as-review.md) - Knowledge review through pull requests

### 3. Structure Patterns
How to organize for knowledge preservation:
- [Directory Structure](structure/directory-structure.md) - Standard knowledge organization
- [Unprocessed Directory](structure/unprocessed-directory.md) - The gold mine of insights
- [Knowledge Lineage](structure/knowledge-lineage.md) - Track understanding to code
- [Temporal Organization](structure/temporal-organization.md) - Time-based structure

### 4. Protocol Patterns (Advanced)
Protocols for enhanced workflows:
- [Seed Protocol](protocols/seed-protocol.md) - Define your development methodology
- [Weather Protocol](protocols/weather-protocol.md) - Context preservation system
- [Handoff Protocol](protocols/handoff-protocol.md) - AI session continuity
- [Phase Protocol](protocols/phase-protocol.md) - Structured work transitions

### 5. Tool Patterns (Optional)
Enhancement tools that support the methodology:
- [CLI Integration](tools/cli-integration.md) - Sprout command structure
- [Metrics Dashboard](tools/metrics-dashboard.md) - Weather Station visualization
- [Multi-Agent Orchestration](tools/multi-agent.md) - Forest TUI patterns
- [Progressive Enhancement](tools/progressive-enhancement.md) - Start simple, grow naturally

## How to Use These Patterns

### Starting Out
1. Read the Core Patterns to understand the philosophy
2. Implement basic Workflow Patterns with just git
3. Add Structure Patterns as needed
4. Explore Protocols when ready for advanced features
5. Consider Tools only after mastering the basics

### Pattern Format
Each pattern follows a consistent structure:
- **Intent**: What problem does this solve?
- **Motivation**: Why is this necessary?
- **Structure**: How is it organized?
- **Implementation**: How to apply it
- **Examples**: Real usage scenarios
- **Consequences**: What happens when you use it
- **Related Patterns**: Connections to other patterns

## Quick Start

The minimum viable Organic Flow practice:

```bash
# Start exploring
git checkout -b flow/new-idea

# Capture insights
echo "# Discoveries" > insights.md

# Harvest knowledge
mkdir -p docs/unprocessed
mv insights.md docs/unprocessed/$(date +%Y%m%d)-new-idea.md
git add docs/unprocessed/
git commit -m "Harvest: new idea insights"

# Review and merge
git push origin flow/new-idea
# Create PR for knowledge review
```

That's it. Everything else builds on this foundation.