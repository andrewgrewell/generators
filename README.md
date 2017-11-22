# JS Generators
A Suite of generators that are helpful for React projects.

These are what I use in my projects so they make assumptions about file structure and dependencies.
I likely will not spend time making this something that will work for any project, so feel free to fork and tweak it to fit your needs.

**TODO**
- support parsing editor output in reducers and prompting to create state setters if they don't exist. e.g.
if the output looks like `return state.setSomeSetter(arg1, arg2);` look at the state model for `setSomeSetter` if it
isn't found, prompt to create it, passing in `arg1, arg2`