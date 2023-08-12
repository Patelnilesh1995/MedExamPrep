
import React from 'react';
import { View, Text } from 'react-native';
import HTML from 'react-native-render-html';

const TextWithoutHtmlTags = ({ htmlContent }) => {
  return (
    <View>
      <HTML
        source={{ html: htmlContent }}
        baseFontStyle={{ fontFamily: 'Roboto-Regular' }} // Customize font style if needed
        renderers={{
          p: (htmlAttribs, children, convertedCSSStyles, passProps) => {
            return <Text>{children}</Text>;
          },
          strong: (htmlAttribs, children, convertedCSSStyles, passProps) => {
            return <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
          },
        }}
      />
    </View>
  );
};

export default TextWithoutHtmlTags;