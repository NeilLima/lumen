'use client';

import { useState } from 'react';
import type { ConfiguracoesListProps } from '../types/ConfiguracoesListTypes';
import {
  StyledSettingsPanel,
  StyledSettingsHeader,
  StyledSettingsTitle,
  StyledSettingsSubtitle,
  StyledTabsNav,
  StyledTab,
  StyledSettingsSection,
  StyledSectionTitle,
  StyledSectionDescription,
  StyledSettingRow,
  StyledSettingInfo,
  StyledSettingIcon,
  StyledSettingText,
  StyledSettingLabel,
  StyledSettingHint,
  StyledSettingControl,
  StyledToggle,
  StyledSelect,
  StyledActionButton,
  StyledSettingsGrid,
  StyledInfoCard,
  StyledInfoIcon,
  StyledInfoContent,
  StyledInfoValue,
  StyledInfoLabel,
} from '../styles/ConfiguracoesListStyles';

type SettingsTab = 'aparencia' | 'idioma' | 'moeda' | 'backup' | 'seguranca' | 'notificacoes';

const TAB_LABELS: Record<SettingsTab, string> = {
  aparencia: '🎨 Aparência',
  idioma: '🌐 Idioma',
  moeda: '💰 Moeda',
  backup: '💾 Backup',
  seguranca: '🔒 Segurança',
  notificacoes: '🔔 Notificações',
};

export default function ConfiguracoesListComp({
  configuracoesFiltradas,
}: ConfiguracoesListProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('aparencia');
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    temaEscuro: true,
    animacoes: true,
    notifEmail: true,
    notifPush: false,
    notifVencimento: true,
    notifMeta: true,
    notifOrcamento: true,
    backupAuto: true,
    autenticacao2FA: false,
    biometria: false,
  });

  const toggleSetting = (key: string) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs: SettingsTab[] = ['aparencia', 'idioma', 'moeda', 'backup', 'seguranca', 'notificacoes'];

  return (
    <StyledSettingsPanel>
      <StyledSettingsHeader>
        <div>
          <StyledSettingsTitle>Configurações</StyledSettingsTitle>
          <StyledSettingsSubtitle>Personalize sua experiência no Lumen</StyledSettingsSubtitle>
        </div>
      </StyledSettingsHeader>

      {/* Navegação por Tabs */}
      <StyledTabsNav>
        {tabs.map(tab => (
          <StyledTab
            key={tab}
            $active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {TAB_LABELS[tab]}
          </StyledTab>
        ))}
      </StyledTabsNav>

      {/* Conteúdo baseado na tab ativa */}
      {activeTab === 'aparencia' && (
        <StyledSettingsSection>
          <StyledSectionTitle>🎨 Aparência</StyledSectionTitle>
          <StyledSectionDescription>Customize a aparência da aplicação</StyledSectionDescription>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#8b5cf6">🌙</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Tema Escuro</StyledSettingLabel>
                <StyledSettingHint>Ativa o tema escuro premium</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledToggle $checked={toggles.temaEscuro} onClick={() => toggleSetting('temaEscuro')} />
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#3b82f6">✨</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Animações</StyledSettingLabel>
                <StyledSettingHint>Animações discretas e transições suaves</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledToggle $checked={toggles.animacoes} onClick={() => toggleSetting('animacoes')} />
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#10b981">📐</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Densidade da Interface</StyledSettingLabel>
                <StyledSettingHint>Adjusta o espaçamento entre elementos</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledSelect defaultValue="confortavel">
                <option value="compacta">Compacta</option>
                <option value="confortavel">Confortável</option>
                <option value="ampla">Ampla</option>
              </StyledSelect>
            </StyledSettingControl>
          </StyledSettingRow>
        </StyledSettingsSection>
      )}

      {activeTab === 'idioma' && (
        <StyledSettingsSection>
          <StyledSectionTitle>🌐 Idioma e Região</StyledSectionTitle>
          <StyledSectionDescription>Configure o idioma e formato regional</StyledSectionDescription>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#10b981">🗣️</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Idioma</StyledSettingLabel>
                <StyledSettingHint>Idioma da interface</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledSelect defaultValue="pt-BR">
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </StyledSelect>
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#f59e0b">📅</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Formato de Data</StyledSettingLabel>
                <StyledSettingHint>Como as datas são exibidas</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledSelect defaultValue="dd/mm/yyyy">
                <option value="dd/mm/yyyy">DD/MM/AAAA</option>
                <option value="mm/dd/yyyy">MM/DD/AAAA</option>
                <option value="yyyy-mm-dd">AAAA-MM-DD</option>
              </StyledSelect>
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#8b5cf6">🕐</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Fuso Horário</StyledSettingLabel>
                <StyledSettingHint>Seu fuso horário local</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledSelect defaultValue="america_fortaleza">
                <option value="america_fortaleza">America/Fortaleza (UTC-3)</option>
                <option value="america_sao_paulo">America/São_Paulo (UTC-3)</option>
                <option value="america_manaus">America/Manaus (UTC-4)</option>
              </StyledSelect>
            </StyledSettingControl>
          </StyledSettingRow>
        </StyledSettingsSection>
      )}

      {activeTab === 'moeda' && (
        <StyledSettingsSection>
          <StyledSectionTitle>💰 Moeda e Formato</StyledSectionTitle>
          <StyledSectionDescription>Configure a moeda e formato de valores</StyledSectionDescription>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#f59e0b">💵</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Moeda Padrão</StyledSettingLabel>
                <StyledSettingHint>Moeda usada em todos os valores</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledSelect defaultValue="BRL">
                <option value="BRL">Real (R$)</option>
                <option value="USD">Dólar ($)</option>
                <option value="EUR">Euro (€)</option>
              </StyledSelect>
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#3b82f6">🔢</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Casas Decimais</StyledSettingLabel>
                <StyledSettingHint>Número de casas após a vírgula</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledSelect defaultValue="2">
                <option value="0">0 (R$ 1.000)</option>
                <option value="2">2 (R$ 1.000,00)</option>
                <option value="3">3 (R$ 1.000,000)</option>
              </StyledSelect>
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#10b981">📊</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Separador de Milhar</StyledSettingLabel>
                <StyledSettingHint>Como separar milhares</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledSelect defaultValue="ponto">
                <option value="ponto">Ponto (1.000,00)</option>
                <option value="virgula">Vírgula (1,000.00)</option>
                <option value="espaco">Espaço (1 000,00)</option>
              </StyledSelect>
            </StyledSettingControl>
          </StyledSettingRow>
        </StyledSettingsSection>
      )}

      {activeTab === 'backup' && (
        <StyledSettingsSection>
          <StyledSectionTitle>💾 Backup e Exportação</StyledSectionTitle>
          <StyledSectionDescription>Gerencie backups e exportação de dados</StyledSectionDescription>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#8b5cf6">🔄</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Backup Automático</StyledSettingLabel>
                <StyledSettingHint>Backup semanal automático dos dados</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledToggle $checked={toggles.backupAuto} onClick={() => toggleSetting('backupAuto')} />
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#3b82f6">📥</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Exportar Dados</StyledSettingLabel>
                <StyledSettingHint>Baixe todos os seus dados em PDF ou Excel</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledActionButton>📄 PDF</StyledActionButton>
              <StyledActionButton>📊 Excel</StyledActionButton>
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#10b981">📤</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Importar Dados</StyledSettingLabel>
                <StyledSettingHint>Importe dados de outro arquivo</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledActionButton $variant="primary">Selecionar Arquivo</StyledActionButton>
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#ef4444">⚠️</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Restaurar Backup</StyledSettingLabel>
                <StyledSettingHint>Restaure seus dados a partir de um backup</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledActionButton $variant="danger">Restaurar</StyledActionButton>
            </StyledSettingControl>
          </StyledSettingRow>
        </StyledSettingsSection>
      )}

      {activeTab === 'seguranca' && (
        <StyledSettingsSection>
          <StyledSectionTitle>🔒 Segurança</StyledSectionTitle>
          <StyledSectionDescription>Configure a segurança da sua conta</StyledSectionDescription>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#ef4444">🔐</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Autenticação em Dois Fatores</StyledSettingLabel>
                <StyledSettingHint>Camada extra de segurança no login</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledToggle $checked={toggles.autenticacao2FA} onClick={() => toggleSetting('autenticacao2FA')} />
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#10b981">👆</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Biometria</StyledSettingLabel>
                <StyledSettingHint>Login por biometria (se disponível)</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledToggle $checked={toggles.biometria} onClick={() => toggleSetting('biometria')} />
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#f59e0b">🔑</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Alterar Senha</StyledSettingLabel>
                <StyledSettingHint>Atualize sua senha de acesso</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledActionButton $variant="primary">Alterar</StyledActionButton>
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#8b5cf6">📱</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Sessões Ativas</StyledSettingLabel>
                <StyledSettingHint>Gerencie dispositivos conectados</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledActionButton>Ver Dispositivos</StyledActionButton>
            </StyledSettingControl>
          </StyledSettingRow>
        </StyledSettingsSection>
      )}

      {activeTab === 'notificacoes' && (
        <StyledSettingsSection>
          <StyledSectionTitle>🔔 Notificações</StyledSectionTitle>
          <StyledSectionDescription>Configure como e quando receber notificações</StyledSectionDescription>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#3b82f6">📧</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Notificações por Email</StyledSettingLabel>
                <StyledSettingHint>Receba alertas por email</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledToggle $checked={toggles.notifEmail} onClick={() => toggleSetting('notifEmail')} />
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#8b5cf6">📲</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Notificações Push</StyledSettingLabel>
                <StyledSettingHint>Notificações no navegador/dispositivo</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledToggle $checked={toggles.notifPush} onClick={() => toggleSetting('notifPush')} />
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#f59e0b">📅</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Vencimento de Contas</StyledSettingLabel>
                <StyledSettingHint>Avisar sobre contas próximas do vencimento</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledToggle $checked={toggles.notifVencimento} onClick={() => toggleSetting('notifVencimento')} />
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#10b981">🎯</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Metas Atingidas</StyledSettingLabel>
                <StyledSettingHint>Notificar quando uma meta for atingida</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledToggle $checked={toggles.notifMeta} onClick={() => toggleSetting('notifMeta')} />
            </StyledSettingControl>
          </StyledSettingRow>

          <StyledSettingRow>
            <StyledSettingInfo>
              <StyledSettingIcon $color="#ef4444">💸</StyledSettingIcon>
              <StyledSettingText>
                <StyledSettingLabel>Orçamento Excedido</StyledSettingLabel>
                <StyledSettingHint>Avisar quando orçamento for excedido</StyledSettingHint>
              </StyledSettingText>
            </StyledSettingInfo>
            <StyledSettingControl>
              <StyledToggle $checked={toggles.notifOrcamento} onClick={() => toggleSetting('notifOrcamento')} />
            </StyledSettingControl>
          </StyledSettingRow>
        </StyledSettingsSection>
      )}

      {/* Cards informativos na parte inferior */}
      <StyledSettingsGrid>
        <StyledInfoCard $color="#8b5cf6">
          <StyledInfoIcon $color="#8b5cf6">📊</StyledInfoIcon>
          <StyledInfoContent>
            <StyledInfoValue>{configuracoesFiltradas.length}</StyledInfoValue>
            <StyledInfoLabel>Configurações Ativas</StyledInfoLabel>
          </StyledInfoContent>
        </StyledInfoCard>

        <StyledInfoCard $color="#10b981">
          <StyledInfoIcon $color="#10b981">✅</StyledInfoIcon>
          <StyledInfoContent>
            <StyledInfoValue>{Object.values(toggles).filter(v => v).length}</StyledInfoValue>
            <StyledInfoLabel>Recursos Ativados</StyledInfoLabel>
          </StyledInfoContent>
        </StyledInfoCard>

        <StyledInfoCard $color="#f59e0b">
          <StyledInfoIcon $color="#f59e0b">🔄</StyledInfoIcon>
          <StyledInfoContent>
            <StyledInfoValue>v2.0.0</StyledInfoValue>
            <StyledInfoLabel>Versão do Sistema</StyledInfoLabel>
          </StyledInfoContent>
        </StyledInfoCard>
      </StyledSettingsGrid>
    </StyledSettingsPanel>
  );
}