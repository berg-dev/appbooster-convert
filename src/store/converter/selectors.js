export const getConverterPair = state => state.converter.get('pair').toArray();

export const getConverterRate = state => state.converter.get('rate').toObject();
