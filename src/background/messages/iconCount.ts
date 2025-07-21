import { type PlasmoMessaging } from '@plasmohq/messaging';

import { IconCountMessageType } from '~lib/enums/messageTypeEnum';
import drawIconWithCount from '~lib/functions/background/drawIcon';

const handler: PlasmoMessaging.MessageHandler = async (req) => {
  if (!req.body.type) {
    return;
  }

  switch (req.body.type) {
    case IconCountMessageType.updateIcon: {
      const { count } = req.body.payload;
      await drawIconWithCount(count);
      break;
    }
  }
};

export default handler;
