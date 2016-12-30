import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
          <Text style={textStyle}>
              {children}
          </Text>
      </TouchableOpacity>
  );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        height: 40,
        width: 100,
        // flex: 1,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //alignSelf: 'stretch',
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#007aff',
        borderColor: '#007aff',
        marginBottom: 12
    }
};

export { Button };
