timer.js
========

Timer functions for the Hopper interpreter.

There are two methods:

```
after(time : Number) do(action : Action) -> Timer
```

Execute the given action after the given number of milliseconds have passed.

```
every(time : Number) do(action : Action) -> Timer
```

Execute the given action every time the given number of milliseconds have
passed.

A `Timer` object has a single method `stop` which cancels the timer.

## Licensing

Copyright (C) 2014 Elizabeth Kim

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program. If not, see http://www.gnu.org/licenses/gpl.

