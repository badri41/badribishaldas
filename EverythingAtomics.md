 weak can spuriously fail even if its same. strong does not spuriously fail 
Like in loops we use weak to ensure a do or die type like it will exit the loop only after modifyinh it or infinite loop, so even if its spuriously fails it can retry again this is retry semantics. its the difference between decision semantics which with comp exh strong, it sees if its false then that means value is different than expected

This is the Retry After Fail semantics, This guarantees a lock free behavious because if this thread fails to make it true any other thread progressed that means in modifying it in finite steps. 
Its dangerous as the current thread loops infinitely if the value never matches with expected 
