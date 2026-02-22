export const en = {
  translation: {
    appTitle: 'Co-Parenting Calendar',
    meta: {
      title: 'Organize Shared Custody',
      description: 'Manage your children\'s shared custody calendar simply and efficiently. Track periods with each parent.',
      keywords: 'shared custody, parental calendar, co-parenting, family organization, custody division',
    },
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      edit: 'Edit',
      remove: 'Remove',
      confirm: 'Confirm',
    },
    calendar: {
      days: 'days',
      weekDays: {
        sun: 'Sun',
        mon: 'Mon',
        tue: 'Tue',
        wed: 'Wed',
        thu: 'Thu',
        fri: 'Fri',
        sat: 'Sat',
      },
      parents: {
        father: 'Father',
        mother: 'Mother',
        shared: {
          default: 'Shared',
          fatherToMother: 'Father / Mother',
          motherToFather: 'Mother / Father',
        },
        none: 'None',
      },
      views: {
        month: 'Month',
        year: 'Year',
      },
      clear: {
        button: 'Clear',
        confirmation: 'Are you sure you want to clear all calendar markings?',
      },
      event: {
        addTitle: 'Add Event',
        subtitle: 'Set a name to highlight this date on the calendar',
        nameLabel: 'Event Name',
        placeholder: 'Event name',
        defaultName: 'Event',
        success: 'Event saved!',
        removed: 'Event removed!',
        confirmDelete: 'Are you sure you want to remove this event?',
      },
      export: {
        button: 'Export JSON',
        title: 'Calendar Data',
        close: 'Close',
        copy: 'Copy to clipboard',
        copySuccess: 'JSON copied successfully!',
        copyError: 'Error copying JSON',
      },
      save: {
        button: 'Save Calendar',
        saving: 'Saving calendar data...',
        success: 'Calendar saved successfully!',
        error: 'Error saving calendar',
        noData: 'No data to save',
        preview: {
          title: 'Review Calendar Data',
          subtitle: 'Please review the following data before saving:',
          date: 'Date',
          responsibility: 'Responsibility',
          confirm: 'Save',
          cancel: 'Cancel',
          total: 'Total entries',
        },
      },
    },
    alerts: {
      confirmation: {
        defaultTitle: 'Are you sure?',
        confirm: 'Yes',
        cancel: 'Cancel',
      },
      errors: {
        generic: 'An error occurred',
        network: 'Network error. Please try again.',
        validation: 'Please check your input and try again.',
      },
    },
    family: {
      title: 'Family Members',
      children: 'Children',
      parents: 'Parents',
      actions: {
        add: {
          childTitle: 'Add Child',
          parentTitle: 'Add Parent',
          childPlaceholder: 'Child name',
          parentPlaceholder: 'Parent name',
          success: {
            child: 'Child added successfully',
            parent: 'Parent added successfully',
          },
        },
        remove: {
          childTitle: 'Remove Child',
          parentTitle: 'Remove Parent',
          childConfirmation: 'Are you sure you want to remove {{name}}?',
          parentConfirmation: 'Are you sure you want to remove {{name}}?',
          success: {
            child: 'Child removed successfully',
            parent: 'Parent removed successfully',
          },
        },
        edit: {
          childName: 'Edit Child Name',
          parentName: 'Edit Parent Name',
          success: 'Name updated successfully',
          nameRequired: 'Name is required',
        },
        removePhoto: {
          title: 'Remove Photo',
          confirmation: 'Are you sure you want to remove this photo?',
          success: 'Photo removed successfully',
        },
      },
    },
  },
};
