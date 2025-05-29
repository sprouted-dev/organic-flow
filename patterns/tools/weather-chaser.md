# Weather Chaser Pattern

## Intent
Deploy an automated observer agent that continuously monitors development activity, captures patterns and insights, and adds them to the knowledge base without interrupting flow.

## Motivation
Developers miss valuable patterns because:
- Too focused on current task to notice
- Insights fade if not captured immediately
- Patterns only visible over time
- Context switches lose observations
- Manual documentation breaks flow

Weather Chaser provides:
- Automatic pattern detection
- Zero-interruption observation
- Temporal pattern analysis
- Knowledge accumulation
- Team awareness insights

## Structure
```
Weather Chaser Components:
├── File System Observer (watches changes)
├── Pattern Detector (identifies insights)
├── Knowledge Capturer (writes to unprocessed/)
├── Metric Collector (feeds Weather Station)
└── Alert System (context awareness)
```

## Implementation

### 1. Basic File Observation
```python
# weather_chaser.py - Core observer

class WeatherChaser:
    def __init__(self, project_root):
        self.project_root = project_root
        self.unprocessed = f"{project_root}/docs/unprocessed"
        self.session_start = datetime.now()
        self.edit_counts = defaultdict(int)
    
    def observe_file_change(self, filepath, event_type):
        self.edit_counts[filepath] += 1
        
        # Detect hotspots
        if self.edit_counts[filepath] > 10:
            self.capture_observation(
                "complexity-hotspot",
                f"File {filepath} edited {self.edit_counts[filepath]} times"
            )
    
    def capture_observation(self, obs_type, content):
        timestamp = datetime.now().strftime("%Y-%m-%d-%H%M%S")
        filename = f"{self.unprocessed}/{timestamp}-{obs_type}.md"
        
        with open(filename, 'w') as f:
            f.write(f"# Weather Chaser Observation\n")
            f.write(f"*Captured: {datetime.now().isoformat()}*\n")
            f.write(f"*Type: {obs_type}*\n\n")
            f.write(content)
```

### 2. Pattern Detection
```python
def detect_patterns(self):
    # Flow session patterns
    if self.current_branch.startswith('flow/'):
        duration = datetime.now() - self.session_start
        if duration > timedelta(hours=2):
            self.capture_observation(
                "long-flow-session",
                f"Flow session exceeding 2 hours. Consider harvest?"
            )
    
    # Edit velocity patterns
    recent_edits = self.get_edits_last_n_minutes(30)
    if len(recent_edits) > 50:
        self.capture_observation(
            "high-velocity",
            f"High edit velocity: {len(recent_edits)} edits in 30min"
        )
    
    # Time-based patterns
    hour = datetime.now().hour
    if hour in self.high_productivity_hours:
        if len(recent_edits) < 5:
            self.capture_observation(
                "unusual-pattern",
                "Low activity during typically productive hours"
            )
```

### 3. Knowledge Drift Detection
```python
def check_knowledge_drift(self):
    # Compare documentation to code
    for doc in self.get_decision_docs():
        referenced_code = self.extract_code_references(doc)
        for code_file in referenced_code:
            if self.has_diverged(doc, code_file):
                self.capture_observation(
                    "drift-detected",
                    f"Implementation in {code_file} may have "
                    f"drifted from decision in {doc}"
                )
```

### 4. Context Monitoring
```python
def monitor_ai_context(self):
    weather = self.read_weather_json()
    context_usage = weather.get('context_usage', '0%')
    
    if int(context_usage.rstrip('%')) > 80:
        self.capture_observation(
            "context-warning",
            f"AI context at {context_usage}. "
            "Natural break point approaching?"
        )
        
        # Suggest harvest point
        current_focus = weather.get('current_focus')
        self.capture_observation(
            "harvest-suggestion",
            f"Consider harvesting after completing: {current_focus}"
        )
```

### 5. Observation Examples
```markdown
# Weather Chaser Observation
*Captured: 2025-01-29T16:45:23*
*Type: complexity-hotspot*

File src/auth/jwt.service.ts edited 23 times in past hour.
Lines 45-67 changed 15 times.

Possible issues:
- Complex logic needing extraction
- Unclear requirements
- Trial-and-error implementation

Consider: Step back and clarify in flow branch?
```

```markdown
# Weather Chaser Observation  
*Captured: 2025-01-29T18:00:00*
*Type: daily-pattern*

Today's Development Pattern:
- 09:00-10:30: High velocity (87 edits/hour)
- 10:30-12:00: Steady work (43 edits/hour)
- 13:00-14:30: Low velocity (12 edits/hour)
- 14:30-16:00: High velocity (72 edits/hour)
- 16:00-17:30: Documentation focus

Insight: Post-lunch dip consistent with previous days
```

```markdown
# Weather Chaser Observation
*Captured: 2025-01-29T15:30:00*
*Type: knowledge-connection*

Strong knowledge-to-code connection detected:
- docs/unprocessed/2025-01-29-caching-strategy.md
- Referenced during edits to:
  - src/cache/redis.service.ts
  - src/cache/invalidation.ts
  - tests/cache.spec.ts

Pattern: Implementation closely following documented strategy
```

## Examples

### Team Awareness (Future)
```markdown
# Weather Chaser Observation
*Captured: 2025-01-30T10:30:00*
*Type: team-overlap*

Potential knowledge collision detected:
- Sarah working in: flow/api-redesign
- Marcus working in: impl/api-gateway
- Both touching: src/api/*

Suggestion: Quick sync to align understanding?
```

### Auto-Harvesting Assistance
```markdown
# Weather Chaser Observation
*Captured: 2025-01-29T17:00:00*
*Type: harvest-ready*

Flow session flow/auth-exploration appears complete:
- Duration: 3.5 hours
- Files created: 12
- Last edit: 20 minutes ago
- Energy pattern: High → Medium → Low

Ready for harvest? Key themes detected:
- JWT implementation strategy
- Refresh token patterns  
- Security considerations
```

## Consequences

### Benefits
- **Invisible insights**: Captures patterns you miss
- **Zero friction**: No manual intervention
- **Temporal awareness**: Spots time-based patterns
- **Drift prevention**: Catches divergence early
- **Team intelligence**: Collective pattern awareness

### Considerations
- Can generate many observations
- Needs tuning to avoid noise
- Privacy considerations
- Resource usage for watching
- May need filtering rules

### Configuration Options
```yaml
# .weather-chaser.yml
observe:
  - file_changes: true
  - commit_patterns: true
  - time_patterns: true
  - team_patterns: false  # Enable for teams

capture:
  - hotspots: 10         # Edits before hotspot
  - session_length: 120  # Minutes before long
  - context_warning: 80  # Percent threshold

ignore:
  - node_modules/
  - .git/
  - build/
```

## Related Patterns
- [Weather Protocol](../protocols/weather-protocol.md) - State tracking
- [Temporal Integrity](../core/temporal-integrity.md) - Time patterns
- [Unprocessed Directory](../structure/unprocessed-directory.md) - Where observations go
- [Metrics Dashboard](metrics-dashboard.md) - Visualization of patterns