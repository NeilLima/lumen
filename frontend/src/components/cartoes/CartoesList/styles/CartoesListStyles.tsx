import styled from 'styled-components';

export const StyledListContainer = styled.div`display: flex; flex-direction: column; gap: 20px;`;
export const StyledFilters = styled.div`display: flex; gap: 12px; flex-wrap: wrap; align-items: center;`;
export const StyledFilterInput = styled.input`flex: 1; min-width: 200px; padding: 10px 16px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(26,26,46,0.8); color: #fff; font-size: 14px; &:focus { outline: none; border-color: rgba(139,92,246,0.5); }`;
export const StyledFilterSelect = styled.select`padding: 10px 16px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(26,26,46,0.8); color: #fff; font-size: 14px; min-width: 160px;`;
export const StyledCleanButton = styled.button`padding: 10px 16px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(26,26,46,0.8); color: #fff; cursor: pointer; font-size: 14px; transition: all 200ms ease; &:hover { background: rgba(37,37,66,0.8); }`;
export const StyledCardsGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;`;
export const StyledCard = styled.div`background: linear-gradient(135deg, rgba(26,26,46,0.8) 0%, rgba(15,15,26,0.9) 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden; transition: all 200ms ease; &:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.4); }`;
export const StyledCardHeader = styled.div`padding: 20px 20px 0; display: flex; flex-direction: column; gap: 4px;`;
export const StyledCardNome = styled.h3`margin: 8px 0 0; font-size: 18px; font-weight: 700; color: #fff;`;
export const StyledCardBanco = styled.span`font-size: 13px; color: #a0a0b0;`;
export const StyledCardBody = styled.div`padding: 16px 20px; display: flex; flex-direction: column; gap: 8px;`;
export const StyledCardInfo = styled.div`display: flex; justify-content: space-between;`;
export const StyledCardLabel = styled.span`font-size: 13px; color: #a0a0b0;`;
export const StyledCardValue = styled.span`font-size: 14px; font-weight: 600; color: #fff;`;
export const StyledCardActions = styled.div`display: flex; gap: 8px; padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.05);`;
export const StyledActionButton = styled.button`width: 36px; height: 36px; border: none; border-radius: 8px; background: rgba(139,92,246,0.1); cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: all 200ms ease; &:hover { background: rgba(139,92,246,0.2); }`;
export const StyledEmpty = styled.div`text-align: center; padding: 60px 20px; color: #a0a0b0; font-size: 16px;`;
