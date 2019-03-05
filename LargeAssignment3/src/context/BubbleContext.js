import React from 'react';

const BubbleContext = React.createContext({});

export const BubbleProvider = BubbleContext.Provider;
export const BubbleConsumer = BubbleContext.Consumer;