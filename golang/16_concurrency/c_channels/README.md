
Channels:
1.Channels in Go act as a medium for goroutines to communicate with each other.
2.We know that goroutines are used to create concurrent programs. channels that allow goroutines to communicate and share resources with each other.

we use the make() function to create a channel. For example,

channelName := make(chan int)
Here,

channelName - name of the channel
(chan int) - indicates that the channel is of integer type