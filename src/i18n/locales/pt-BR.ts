export const ptBR = {
  translation: {
    appTitle: 'Calendário de Coparentalidade',
    meta: {
      title: 'Organize a Guarda Compartilhada',
      description: 'Gerencie o calendário de guarda compartilhada dos seus filhos de forma simples e eficiente. Acompanhe os períodos com cada responsável.',
      keywords: 'guarda compartilhada, calendário parental, coparentalidade, organização familiar, divisão de guarda',
    },
    common: {
      loading: 'Carregando...',
      save: 'Salvar',
      cancel: 'Cancelar',
      close: 'Fechar',
      edit: 'Editar',
      remove: 'Remover',
      confirm: 'Confirmar',
    },
    calendar: {
      days: 'dias',
      weekDays: {
        sun: 'Dom',
        mon: 'Seg',
        tue: 'Ter',
        wed: 'Qua',
        thu: 'Qui',
        fri: 'Sex',
        sat: 'Sáb',
      },
      parents: {
        father: 'Pai',
        mother: 'Mãe',
        shared: {
          default: 'Compartilhado',
          fatherToMother: 'Pai / Mãe',
          motherToFather: 'Mãe / Pai',
        },
        none: 'Nenhum',
      },
      views: {
        month: 'Mês',
        year: 'Ano',
      },
      clear: {
        button: 'Limpar',
        confirmation: 'Tem certeza que deseja limpar todas as marcações do calendário?',
        success: 'Calendário limpo com sucesso!',
      },
      export: {
        button: 'Exportar JSON',
        title: 'Dados do Calendário',
        close: 'Fechar',
        copy: 'Copiar para área de transferência',
        copySuccess: 'JSON copiado com sucesso!',
        copyError: 'Erro ao copiar o JSON',
      },
      save: {
        button: 'Salvar Calendário',
        saving: 'Salvando dados do calendário...',
        success: 'Calendário salvo com sucesso!',
        error: 'Erro ao salvar calendário',
        noData: 'Não há dados para salvar',
        preview: {
          title: 'Revisar Dados do Calendário',
          subtitle: 'Por favor, revise os seguintes dados antes de salvar:',
          date: 'Data',
          responsibility: 'Responsabilidade',
          confirm: 'Salvar',
          cancel: 'Cancelar',
          total: 'Total de registros',
        },
      },
      event: {
        addTitle: 'Adicionar Evento',
        subtitle: 'Defina um nome para destacar esta data no calendário',
        nameLabel: 'Nome do Evento',
        placeholder: 'Nome do evento',
        defaultName: 'Evento',
        success: 'Evento salvo!',
        removed: 'Evento removido!',
        confirmDelete: 'Tem certeza que deseja remover este evento?',
      },
    },
    alerts: {
      confirmation: {
        defaultTitle: 'Você tem certeza?',
        confirm: 'Sim',
        cancel: 'Cancelar',
      },
      errors: {
        generic: 'Ocorreu um erro',
        network: 'Erro de conexão. Por favor, tente novamente.',
        validation: 'Por favor, verifique os dados e tente novamente.',
      },
    },
    family: {
      title: 'Membros da Família',
      children: 'Filhos',
      parents: 'Pais',
      actions: {
        add: {
          childTitle: 'Adicionar Filho',
          parentTitle: 'Adicionar Pai/Mãe',
          childPlaceholder: 'Nome do filho',
          parentPlaceholder: 'Nome do pai/mãe',
          success: {
            child: 'Filho adicionado com sucesso',
            parent: 'Pai/Mãe adicionado com sucesso',
          },
        },
        remove: {
          childTitle: 'Remover Filho',
          parentTitle: 'Remover Pai/Mãe',
          childConfirmation: 'Tem certeza que deseja remover {{name}}?',
          parentConfirmation: 'Tem certeza que deseja remover {{name}}?',
          success: {
            child: 'Filho removido com sucesso',
            parent: 'Pai/Mãe removido com sucesso',
          },
        },
        edit: {
          childName: 'Editar Nome do Filho',
          parentName: 'Editar Nome do Pai/Mãe',
          success: 'Nome atualizado com sucesso',
          nameRequired: 'O nome é obrigatório',
        },
        removePhoto: {
          title: 'Remover Foto',
          confirmation: 'Tem certeza que deseja remover esta foto?',
          success: 'Foto removida com sucesso',
        },
      },
    },
  },
};
