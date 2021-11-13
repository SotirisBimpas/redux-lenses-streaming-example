## Part2:

* a - For this task i created a new state filteredMessages property that should be updated typing mix and max values for the filtering range and while receiving a new message, if the min and max values are not undefined.
Messagelist component will render the filteredMessages array if it's not empty, else it will render the whole messages array. I would add a currency filter for this to be more accurate.

* b - For this task i am checking the rownum of the message immediately when is received and close the websocket connection if it ecxeeds 10000

* c - For this task, i would separate  transactions depending on their currency and store them to a new state property. Then i would set an interval every 2 seconds to filter them based on their timestamp, calculate the average and update the chart state.   

* d - i didn't manage to do any testing

* e - My approach for this was to first turn it into a react function component and then turn into typescript