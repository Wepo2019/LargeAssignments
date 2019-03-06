import React from 'react';

const BundlesContext = React.createContext({});

export const BundlesProvider = BundlesContext.Provider;
export const BundlesConsumer = BundlesContext.Consumer;