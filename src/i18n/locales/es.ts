export const es = {
  translation: {
    appTitle: 'Calendario de Coparentalidad',
    meta: {
      title: 'Organiza la Custodia Compartida',
      description: 'Administra el calendario de custodia compartida de tus hijos de forma simple y eficiente. Sigue los periodos con cada responsable.',
      keywords: 'custodia compartida, calendario parental, coparentalidad, organización familiar, división de custodia',
    },
    common: {
      loading: 'Cargando...',
      save: 'Guardar',
      cancel: 'Cancelar',
      close: 'Cerrar',
      edit: 'Editar',
      remove: 'Eliminar',
      confirm: 'Confirmar',
    },
    calendar: {
      days: 'días',
      weekDays: {
        sun: 'Dom',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mié',
        thu: 'Jue',
        fri: 'Vie',
        sat: 'Sáb',
      },
      parents: {
        father: 'Padre',
        mother: 'Madre',
        shared: {
          default: 'Compartido',
          fatherToMother: 'Padre / Madre',
          motherToFather: 'Madre / Padre',
        },
        none: 'Ninguno',
      },
      views: {
        month: 'Mes',
        year: 'Año',
      },
      clear: {
        button: 'Limpiar',
        confirmation: '¿Seguro que deseas limpiar todas las marcas del calendario?',
        success: 'Calendario limpiado con éxito',
      },
      event: {
        addTitle: 'Agregar Evento',
        placeholder: 'Nombre del evento',
        defaultName: 'Evento',
        success: '¡Evento guardado!',
        removed: '¡Evento eliminado!',
      },
      export: {
        button: 'Exportar JSON',
        title: 'Datos del Calendario',
        close: 'Cerrar',
        copy: 'Copiar al portapapeles',
        copySuccess: 'JSON copiado con éxito',
        copyError: 'Error al copiar el JSON',
      },
      save: {
        button: 'Guardar Calendario',
        saving: 'Guardando datos del calendario...',
        success: 'Calendario guardado con éxito',
        error: 'Error al guardar el calendario',
        noData: 'No hay datos para guardar',
        preview: {
          title: 'Revisar Datos del Calendario',
          subtitle: 'Por favor, revisa los siguientes datos antes de guardar:',
          date: 'Fecha',
          responsibility: 'Responsabilidad',
          confirm: 'Guardar',
          cancel: 'Cancelar',
          total: 'Total de registros',
        },
      },
    },
    alerts: {
      confirmation: {
        defaultTitle: '¿Estás seguro?',
        confirm: 'Sí',
        cancel: 'Cancelar',
      },
      errors: {
        generic: 'Ocurrió un error',
        network: 'Error de conexión. Por favor, inténtalo de nuevo.',
        validation: 'Por favor, verifica los datos e inténtalo de nuevo.',
      },
    },
    family: {
      title: 'Miembros de la Familia',
      children: 'Hijos',
      parents: 'Padres',
      actions: {
        add: {
          childTitle: 'Agregar Hijo',
          parentTitle: 'Agregar Padre/Madre',
          childPlaceholder: 'Nombre del hijo',
          parentPlaceholder: 'Nombre del padre/madre',
          success: {
            child: 'Hijo agregado con éxito',
            parent: 'Padre/Madre agregado con éxito',
          },
        },
        remove: {
          childTitle: 'Eliminar Hijo',
          parentTitle: 'Eliminar Padre/Madre',
          childConfirmation: '¿Seguro que deseas eliminar {{name}}?',
          parentConfirmation: '¿Seguro que deseas eliminar {{name}}?',
          success: {
            child: 'Hijo eliminado con éxito',
            parent: 'Padre/Madre eliminado con éxito',
          },
        },
        edit: {
          childName: 'Editar Nombre del Hijo',
          parentName: 'Editar Nombre del Padre/Madre',
          success: 'Nombre actualizado con éxito',
          nameRequired: 'El nombre es obligatorio',
        },
        removePhoto: {
          title: 'Eliminar Foto',
          confirmation: '¿Seguro que deseas eliminar esta foto?',
          success: 'Foto eliminada con éxito',
        },
      },
    },
  },
};
