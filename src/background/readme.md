# Background Scripts

This directory contains all background scripts for the browser extension. Background scripts run in the extension's background context and handle long-running tasks, messaging, and browser API interactions.

### Structure

- **`./index.ts`** - Main background script that initializes the extension and imports message handlers
- **`./messages/`** - Directory containing message handlers for communication between content scripts, popup, and background

## Best Practices

1. **Keep Root `index.ts` clean** - The main background script should only handle initialization and critical setup
2. **Organize message handlers by context** - Create separate files for different contexts.
3. **Dont make extensive files** - if line count in file > 300 - something went wrong. Move helpers to utils, split handlers to multiple, etc.
4. **Use try-catch-finally blocks** - Better for debugging, and creating non interruptive flow

## Message Types

Proper message typing is important to keep code clean and readable.
Here is a code snippet, that shows example of how to setup messaging.

There are no imports, so it takes less space

### ./lib/enums/messageTypeEnum.ts

```ts
export enum MessageType {
  increaseCount = 'increaseCount', // Optional. It's easier to debug code with string values, especially if enum contains 3+ elements.
  decreaseCount,
}
```

### src/content/content.ts or src/popup.tsx

```ts
sendToBackground({
  name: 'count', // Name should be the same as file name in src/background/messages/. TS going to show error (2322) type is not assignable. Don't worry after prod-build/dev-build, if setup is correct it will go away.
  body: {
    type: MessageType.increaseCount,
    payload: {
      // some payload if needed. If not - payload property should not be included at all
    },
  },
});
//This structure helps to create durable and maintainable structure of messages
```

### src/background/messages/count.ts

```ts
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
  res.send({ success: true });
};

export default handler; // default export is needed for plasmo
```
