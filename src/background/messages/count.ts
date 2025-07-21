import { type PlasmoMessaging } from '@plasmohq/messaging';

import { MessageType } from '~lib/enums/messageTypeEnum';

let count = 0;

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  if (!req.body.type) {
    // early return, if no type in request
    return;
  }
  switch (
    req.body.type // switch is important in handler. Use it even with low number of cases, for better scalability and readability
  ) {
    case MessageType.increaseCount: {
      count += 1;
      break;
    }
    case MessageType.decreaseCount: {
      count -= 1;
      break;
    }
    default: {
      console.error('not supported message type: ', req.body.type);
      res.send({ success: false }); // res.send is optional. Only if content/popup supposed to receive some value
    }
  }
  res.send({ success: true, count });
};

export default handler; // default export is needed for plasmo
