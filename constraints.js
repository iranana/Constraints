
/*
Utility to map HTML5 constraint violations to readable error messages.
This utility is largely intended to polyfill Safari, which returns a rather
unfriendly validationMessage for a given input.

https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation

var message = Constraints.validate(input);
*/
(() => {
  "use strict";

  const constraints = {
    badInput: {
      messages: {
        input: {
          'text': 'Please enter a valid value.',
          'search': 'Please enter a valid value.',
          'url': 'Please enter a valid URL.',
          'tel': 'Please enter a valid phone number.',
          'email': 'Please enter a valid e-mail.',
          'password': 'Please enter a valid password.',
          'date': 'Please enter a valid date.',
          'datetime': 'Please enter a valid date and time.',
          'datetime-local': 'Please enter a valid date and time.',
          'month': 'Please enter a valid month.',
          'week': 'Please enter a valid week.',
          'time': 'Please enter a valid time.',
          'number': 'Please enter a valid number.',
          'checkbox': 'Please select an option.',
          'radio': 'Please fill select an option.',
          'file': 'Please select a valid file.',
        },
        select: {
          'select-multiple': 'Please select an item in the list.',
          'select-one': 'Please select an item in the list',
        },
        textarea: {
          'textarea': 'Please enter a valid value.'
        }
      },
    },
    patternMismatch: {
      messages: {
        input: {
          'text': `Please match the format requested: {0}.`,
          'search': `Please match the format requested: {0}.`,
          'url': `Please match the format requested: {0}.`,
          'tel': `Please match the format requested: {0}.`,
          'email': `Please match the format requested: {0}.`,
          'password': `Please match the format requested: {0}.`,
        },
      }
    },
    rangeOverflow: {
      messages: {
        input: {
          'range': `Value must be less than or equal to {0}.`,
          'number': `Value must be less than or equal to {0}.`,
          'date': `Date must be less than or equal to {0}.`,
          'month': `Month must be less than or equal to {0}.`,
          'week': `Week must be less than or equal to {0}.`,
          'datetime': `Date and time must be less than or equal to {0}.`,
          'datetime-local': `Date and time must be less than or equal to {0}.`,
          'time': `Time must be less than or equal to {0}.`,
        },
      }
    },
    rangeUnderflow: {
      messages: {
        input: {
          'range': `Value must be greater than or equal to {0}.`,
          'number': `Value must be greater than or equal to {0}.`,
          'date': `Date must be greater than or equal to {0}.`,
          'month': `Month must be greater than or equal to {0}.`,
          'week': `Week must be greater than or equal to {0}.`,
          'datetime': `Date and time must be greater than or equal to {0}.`,
          'datetime-local': `Date and time must be greater than or equal to {0}.`,
          'time': `Time must be greater than or equal to {0}.`,
        },
      }
    },
    stepMismatch: {
      messages: {
        input: {
          'date': `Date must be entered in increments of {0} days.`,
          'month': `Date must be entered in increments of {0} months.`,
          'week': `Date must be entered in increments of {0} weeks.`,
          'datetime': `Date and time must be entered in increments of {0} seconds or milliseconds.`,
          'datetime-local': `Date and time must be entered in increments of {0} seconds or milliseconds.`,
          'time': `Time must be entered in increments of {0} seconds or milliseconds.`,
          'range': `Value must be enterest in increments of {0}.`,
          'number': `Number must be entered in increments of {0}.`,
        },
      },
    },
    tooLong: {
      messages: {
        input: {
          'text': `Value must be less than {0} characters.`,
          'search': `Value must be less than {0} characters.`,
          'url': `Value must less be than {0} characters.`,
          'tel': `Value must less be than {0} characters.`,
          'email': `Value must less be than {0} characters.`,
          'password': `Value must less be than {0} characters.`,
        },
        textarea: {
          'textarea': `Value must be less than {0} characters.`,
        }
      },
    },
    tooShort: {
      messages: {
        input: {
          'text': `Value must be greater than {0} characters.`,
          'search': `Value must be greater than than {0} characters.`,
          'url': `Value must be greater than {0} characters.`,
          'tel': `Value must be greater than {0} characters.`,
          'email': `Value must be greater than {0} characters.`,
          'password': `Value must be greater than {0} characters.`,
        },
        textarea: {
          'textarea': `Value must be greater than {0} characters.`,
        }
      },
    },
    typeMismatch: {
      messages: {
        input: {
          'url': 'Please enter a valid URL.',
          'email': 'Please enter a valid e-mail address.'
        },
      }
    },
    valueMissing: {
      messages: {
        input: {
          'text': 'Please fill in this field.',
          'search': 'Please fill in this field.',
          'url': 'Please fill in this field.',
          'tel': 'Please fill in this field.',
          'email': 'Please fill in this field.',
          'password': 'Please enter a value.',
          'date': 'Please fill in this field.',
          'datetime': 'Please fill in this field.',
          'datetime-local': 'Please fill in this field.',
          'month': 'Please fill in this field.',
          'week': 'Please fill in this field.',
          'time': 'Please fill in this field.',
          'number': 'Please fill in this field.',
          'checkbox': 'Please fill in this field.',
          'radio': 'Please fill in this field.',
          'file': 'Please fill in this field.',
        },
        select: {
          'select-multiple': 'Please select an item in the list.',
          'select-one': 'Please select an item in the list',
        },
        textarea: {
          'textarea': 'Please fill in this field.'
        }
      }
    }
  };

  var getMessage = (el, violation) => {
    let tagname = el.tagName.toLowerCase();
    let type = el.type || null;
    let message = '';

    if (tagname && type) {
      message = constraints[violation].messages[tagname][type];
    }

    switch (violation) {
      case 'patternMismatch':
        message = message.replace('{0}', el.getAttribute('pattern'));
        break;
      case 'rangeOverflow':
        message = message.replace('{0}', el.getAttribute('max'));
        break;
      case 'rangeUnderflow':
        message = message.replace('{0}', el.getAttribute('min'));
        break;
      case 'stepMismatch':
        message = message.replace('{0}', el.getAttribute('step'));
        break;
      case 'tooLong':
        message = message.replace('{0}', el.getAttribute('maxlength'));
        break;
      case 'tooShort':
        message = message.replace('{0}', el.getAttribute('minlength'));
        break;
    }

    return message;
  }

  var validate = (el) => {
    let validity = {
      badInput: el.validity.badInput,
      patternMismatch: el.validity.patternMismatch,
      rangeOverflow: el.validity.rangeOverflow,
      rangeUnderflow: el.validity.rangeUnderflow,
      stepMismatch: el.validity.stepMismatch,
      tooLong: el.validity.tooLong,
      tooShort: el.validity.tooShort,
      typeMismatch: el.validity.typeMismatch,
      valueMissing: el.validity.valueMissing,
    };

    let violations = Object.keys(validity).filter((key) => {
      if (validity[key]) {
        return key;
      }
    });

    let messages = [];

    violations.forEach((violation) => {
      let message = getMessage(el, violation);
      messages.push(message);
    });

    return messages;
  }

  window.Constraints = {
    validate: validate
  };
})();
