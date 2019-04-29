# deltachat-pollbot

 A text-based bot that does polls

## Example

```
user1> pollbot: ask "question" 
"answer1" 
"answer2" 
"answer3"

user2> pollbot: answer: 1


user2> pollbot ask "sd,,fs."
pollbot> Can't make a poll, a poll is currently in progress!

user2> pollbot: close 
pollbot> Sorry, poll is still open. Only user1 can close the poll, unless user1 leaves the group, then anyone can close the poll.

system> user1 leaves the group
user2> pollbot: close
pollbot> "poll is closed! results: A=23, B=1, C=5" 
```
