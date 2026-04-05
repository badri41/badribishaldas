Reference Talk :- 
https://www.youtube.com/watch?v=jBnIMEb2GhA


WE have some related types we need a single way to represent them all 

vector<???> types.
for (auto type : types) {
    type.do_func()
}
add vtable pic :- vtablepic.png from assets
C++ Solution Inheritance : 

We use inheritance, combined with dynamic dispatch to figure out which inherited class's function we need to call 
this is done using vtables and vptrs (vtable const* const vptr_;)

When working with interfaces the general pattern is that we want to resolve all the different implementations using a single base class
pointer

When you write:

code - C++
class Base {
public:
    virtual void f();
};

C++ secretly does something like:
Creates a vtable (virtual table) for the class
Stores function pointers inside it 

And when a function is called it looks up in the vtable to find out which function to call 

-> You have a base type ptr(Interface) which points towards the Derived type (The implementation)... 

What is a vtable? 
A vtable is a struct with function pointers 

- what is Small Buffer Optimization (SBO)
Keep a union ()
union {
    void* ptr_;
    std::aligned_storage_t<16> buffer_;
};

Either store if object is too big as a ptr or as a buffer if small 
Small Object Case 
on_heap_ = false;
new (&buffer_) Any{vehicle};

uses placement new... 
What it means:
Construct object inside existing memory (buffer_)
No allocation

void accelerate() {
    vptr_->accelerate(on_heap_ ? ptr_ : &buffer_);
}

what does vtable look like 
struct vtable {
    void (*accelerate)(void*);
};

template<typename T>
vtable vtable_for = {
    [](void* obj) {
        static_cast<T*>(obj)->accelerate();
    }
};

why destructors must be made virtual, also "override" key word significance, Whats the size of a virtual class, virtual methods

1. Liskov Substitution Principle (LSP), the principle supporting the Polymorphism pillar
📌 Formal Definition

If S is a subtype of T, then objects of type T should be replaceable with objects of type S without breaking the program.



- what is type-erasure? 
In C++, type erasure is a design pattern that enables polymorphism without requiring types to inherit from a common base class. It "erases" the concrete type of an object while preserving its behavior through a uniform interface.

Standard Library Examples
Several standard containers use this technique to store different types:
std::function: Stores any callable (function pointer, lambda, or functor) that matches a specific signature.
std::any: A type-safe container that can hold a value of literally any type.
std::shared_ptr<void>: Erases the type of the object it points to but still calls the correct destructor when deleted. 
How It Is Implemented
Modern C++ type erasure typically combines three elements:  
A Wrapper Class (The "Object"): The public-facing class that users interact with. It is not a template itself.
An Abstract Base Class (The "Concept"): An internal interface defining the required behaviors as pure virtual functions.
A Templated Derived Class (The "Model"): A private internal class that inherits from the Concept. It stores the concrete object and overrides the virtual functions to forward calls to it. 

std::function typically uses 32–64 bytes SBO
Because most lambdas are small


Dynamic Binding
The process of deciding which function to call at runtime (instead of compile time).
Why does this even exist?

Because sometimes you don’t know the exact type at compile time.

RTTI (Run-Time Type Information) in C++
https://www.geeksforgeeks.org/cpp/rtti-run-time-type-information-in-cpp/
RTTI (Run-Time Type Information) allows a C++ program to identify the actual type of an object while the program is running. It plays an important role when working with inheritance and polymorphism.

Upcasting means converting a derived class object to a base class type. This is safe because the derived class has all attributes of base class.

Downcasting means converting a base class pointer or reference back to a derived class type. This requires a runtime check to ensure the conversion is valid.
// Downcasting: Convert Base pointer back to Derived pointer
Derived *d = dynamic_cast<Derived *>(b);

use flag -fno -rtti to tell the compiler to disable Run-Time Type Information (RTTI)
dynamic_cast<T>: You can no longer use this to safely downcast pointers in an inheritance hierarchy.
typeid: You cannot use typeid(obj) to get a std::type_info object or the name of a class at runtime.

Virtual Table has a Overhead .. 
You need to resolve location of the function 
Dereference the ptr to the vtable 
Execute indirect call 

DRY = Don’t Repeat Yourself
Core C++ Principle 

RTB = Runtime Binding
Function resolved at runtime
Uses virtual / vtable

OFD = Open for Extension, Closed for Modification
Meaning:
You can add new behavior without modifying old code

MLI = Multiple Library Integration

Meaning:
Can different modules / libraries interact cleanly?

AED = Adding Extra Data

👉 Meaning:

Can you easily attach new data/behavior later?

Add image here from assets DispatchTypes.png
Solutions : 
USE SBO, localization etc .

The Alternatives :- CRTP (Curiously Recurring Template Pattern)
Will not discuss here, wait for a blog on Templates in C++      

std::visitor 
std::visit 

constexpr functions ..
what is constexpr keyword? 

A constexpr function :- 
- Must not be virtual (until C++ 20)
- return type & all parameters type must be Literal Type (To disallow Runtime Type Deduction)
- function body must not contain non-Literal type 

Optimizations Type 

-O0/O1 
    Reduce code size and execution time, 
-O2 add loop unrolling 
-O3 all optimizations are on, including inlinining
-Os reduce size 
