# deltachat-pollbot

 A text-based bot that does polls

## Commands

#### `ask`
```
user1> pollbot ask "when are you free for camping?" 
june 1-3
june 12-14
July 3-7
august 23-27
none
pollbot> poll created!
```

Pollbot only does one poll at a time.

```
user2> pollbot ask "sd,,fs."
pollbot> Can't make a poll, a poll is currently in progress by user1!
```

#### `help`

If there is a poll in progress:
```
user2> pollbot help
pollbot> user1 asks "when are you free for camping?"

Options: 
1: june 1-3
2: june 12-14
3: July 3-7
4: august 23-27
5: none

Say something like "pollbot answer 1" to respond!
Say "pollbot close" to get results and start a new poll.
```

If there is no poll in progress:

```
user2> pollbot help
pollbot> There is no poll in progress! Use `pollbot ask <question>
<answer> <answer>...` and `pollbot answer` to respond. When the poll is done,
say `pollbot close`.
```

#### `answer`

```
user2> pollbot answer 1
pollbot> got option #1 

user4> pollbot answer july 3-7
pollbot> got option #3 

user2> pollbot answer 6
pollbot> I didn't understand "6", maybe that answer doesn't exist! Try "pollbot help" 
```

### `close`

Closes the poll and prints results.

```
user2> pollbot: close 
pollbot> "poll is closed! results: A=23, B=1, C=5" 
```



