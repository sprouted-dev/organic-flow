# The Knowledge vs Implementation Spectrum

*Created: 2025-07-29*
*Context: Understanding what belongs in knowledge (main) vs implementation (experiments)*

## The Core Question

When running experiments, we discover many things. Which discoveries belong in our permanent knowledge base, and which stay with the implementation?

## The Spectrum

Think of it as a spectrum from pure knowledge to pure implementation:

```
Universal Truth ←---------------→ Specific Code
(Goes in main)                   (Stays in experiment)
```

## Examples Along the Spectrum

### Pure Knowledge (Definitely Main Branch)
```markdown
"Users need their work to persist across sessions"
"Cache invalidation is one of the two hard problems in computer science"  
"Network calls can fail and must be handled gracefully"
```

### Discovered Constraints (Goes to Main)
```markdown
"Redis connection pool exhausts at 10,000 connections on our infrastructure"
"Image processing uses 5MB per megapixel during transformation"
"Database query performance degrades exponentially after 6 JOIN operations"
```

### Patterns & Formulas (Goes to Main)
```markdown
"Pattern: Use exponential backoff for retrying failed requests"
"Formula: Memory needed = concurrent_users × session_size × timeout_hours"
"Anti-pattern: Storing large objects in session leads to memory pressure"
```

### Implementation Patterns (Borderline - Extract the Why)
```markdown
From implementation:
  const BATCH_SIZE = 500; // Larger batches caused OOM

Extracted to knowledge:
  "Batch processing memory grows non-linearly above 500 items due to 
  intermediate object creation. Sweet spot: 500-1000 items per batch."
```

### Pure Implementation (Stays in Experiment)
```javascript
// Specific syntax, library calls, file structure
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  retryStrategy: (times) => Math.min(times * 100, 3000)
});
```

## The Extraction Process

### What We See in Code
```python
# experiment/image-processing/processor.py
CHUNK_SIZE = 16384  # 16KB - found through testing
MAX_WORKERS = 4     # More workers didn't improve performance
TIMEOUT = 30        # Uploads fail after 30s anyway

def process_image(path):
    # Implementation details...
```

### What We Extract as Knowledge
```markdown
## Image Processing Constraints #knowledge:constraints

Through experimentation, we discovered:

1. **Optimal chunk size**: 16KB
   - Smaller chunks: Network overhead dominates
   - Larger chunks: Memory pressure, no speed benefit
   - Sweet spot balances throughput and memory

2. **Parallelization limit**: 4 workers
   - CPU has 8 cores, but image processing is memory-bound
   - Beyond 4 workers, memory contention reduces performance
   - Formula: optimal_workers = min(cpu_cores/2, available_memory/2GB)

3. **Practical timeout**: 30 seconds
   - 95% of successful uploads complete in <10s
   - Uploads taking >30s have 99% failure rate
   - Network conditions, not processing, determine success

#discovered-in:image-upload-experiment #validates:hypothesis/parallel-processing
```

## Real-World Example: Database Query Optimization

### The Implementation (Experiment Branch)
```sql
-- Tried various approaches
-- Version 1: Nested queries (timeout at 1M records)
-- Version 2: Multiple JOINs (slow at 6+ tables)  
-- Version 3: Materialized view (winner!)

CREATE MATERIALIZED VIEW user_activity_summary AS
SELECT 
    u.id,
    COUNT(DISTINCT s.session_id) as session_count,
    MAX(s.last_active) as last_seen
FROM users u
LEFT JOIN sessions s ON u.id = s.user_id
GROUP BY u.id;

-- Refresh every hour
CREATE INDEX idx_last_seen ON user_activity_summary(last_seen);
```

### The Knowledge (Main Branch)
```markdown
## Database Performance Patterns #knowledge:patterns

### Discovery: Query Complexity vs Data Volume

Tested three approaches for user activity dashboards:

1. **Nested Queries**: Work until ~100K records, then exponential degradation
   - Why: Query planner can't optimize deeply nested subqueries
   - Limit: O(n²) complexity becomes visible at 100K records

2. **Multiple JOINs**: Linear slowdown with each JOIN
   - Why: Each JOIN multiplies the working set
   - Formula: query_time = base_time × 1.7^(join_count)
   - Practical limit: 6 JOINs before users notice lag

3. **Materialized Views**: Best for read-heavy dashboards
   - Trade-off: Storage space for query speed
   - Update cost: ~30s for 10M records
   - Query speedup: 100-1000x for complex aggregations
   - When to use: Read/write ratio > 1000:1

### Pattern: Precompute When Read-Heavy

If data is read 1000x more than written, precomputation pays off.
Even with update costs, total system load decreases.

#applies-to:analytics #discovered-in:dashboard-optimization
```

## The Three Layers of Knowledge

### Layer 1: Universal Principles (Always in Main)
- Business requirements
- User needs
- Computer science principles
- Mathematical laws

### Layer 2: Discovered Constraints (Always in Main)
- Performance limits
- Resource boundaries  
- Scaling formulas
- Breaking points

### Layer 3: Implementation Patterns (Extract the Why)
- Working configurations → Why they work
- Chosen architectures → What problems they solve
- Specific numbers → What constraints they represent

## What Never Goes in Main

### Implementation Details
- Specific syntax
- Library APIs
- File paths
- Variable names
- Framework-specific code

### Temporary Decisions  
- TODO comments
- Quick hacks
- Workarounds
- Debug code
- Test data

### Environment Specifics
- Local configurations
- IP addresses
- Credentials
- Machine-specific paths

## The Extraction Questions

When reviewing experiment code, ask:

1. **Will this help someone solving a similar problem?**
   - If yes → Extract to knowledge
   - If no → Leave in implementation

2. **Is this true regardless of programming language?**
   - If yes → Extract the principle
   - If no → Might still be a pattern worth noting

3. **Did we discover a limit or constraint?**
   - If yes → Document with specific numbers
   - Include the formula or relationship

4. **Would this surprise someone?**
   - If yes → It's probably valuable knowledge
   - Document what we expected vs what we found

5. **Is this a pattern we'd want to reuse?**
   - If yes → Abstract it from the specifics
   - Document when to apply it

## Example: Complete Extraction

### From This Code:
```go
// In experiment/websocket-scaling/server.go
const (
    MaxConnections = 50000  // Server crashes above this
    PingInterval = 30       // Clients disconnect if >60s
    WriteBuffer = 4096      // Smaller = slow, larger = no benefit
)

// Learned: Must track connections manually
// Go's HTTP server doesn't limit WebSocket connections
var connectionCount atomic.Int32

func handleWS(w http.ResponseWriter, r *http.Request) {
    if connectionCount.Load() >= MaxConnections {
        http.Error(w, "Server at capacity", 503)
        return
    }
    // ... implementation
}
```

### We Extract This Knowledge:
```markdown
## WebSocket Scaling Limits #knowledge:constraints

### Connection Limits
- **Hard limit**: 50,000 concurrent WebSocket connections per server
- **Cause**: Memory exhaustion (each connection ~100KB)
- **Formula**: max_connections = available_memory / 100KB
- **Symptom**: Server crash without warning at limit

### Keep-Alive Requirements  
- **Ping interval**: Must be < 60 seconds
- **Why**: Proxies and load balancers drop idle connections
- **Pattern**: Send ping every interval/2 for safety
- **Gotcha**: Browser WebSockets handle this differently

### Buffer Size Optimization
- **Optimal**: 4KB write buffer
- **Too small** (<1KB): CPU overhead from excessive syscalls
- **Too large** (>8KB): No performance benefit, wastes memory
- **Formula**: buffer_size = median_message_size * 2

### Architectural Learning
**Discovery**: HTTP servers don't limit WebSocket connections by default
**Impact**: Can exhaust resources without warning
**Pattern**: Always implement connection limiting at application level
**Alternative**: Use dedicated WebSocket servers with built-in limits

#learned-from:websocket-scaling #applies-to:real-time-systems
```

## The Value of Extraction

By separating knowledge from implementation:

1. **Future implementations can be different but informed**
   - Next time might use a different language
   - But we know the 50K connection limit exists

2. **Patterns become reusable across projects**
   - Buffer size optimization applies everywhere
   - Not tied to Go or specific libraries

3. **Constraints are documented with evidence**
   - Not just "it doesn't scale"
   - But "fails at 50K connections due to memory"

4. **Learning accumulates over time**
   - Each experiment adds to collective understanding
   - Knowledge compounds, code doesn't

Remember: Implementation is temporary, but the understanding we gain from it is permanent. Extract the understanding.