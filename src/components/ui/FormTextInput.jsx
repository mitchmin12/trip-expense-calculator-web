import styled from "styled-components"

function FormTextInput({className, size, style, label="", value, onChange}) {
    return <StyledLabelContainer>
        <StyledLabel>{label}</StyledLabel>
        <StyledTextInput type="text" style={style} className={className} value={value} onChange={(e) => onChange(e)} />
    </StyledLabelContainer>
}

const StyledLabelContainer = styled.div`
    position: relative;
    display: block;
`

const StyledTextInput = styled.input`
    all: unset;
    font-size: 1rem;
    padding: 6px 12px;
    border-radius: 2px;

    background-color: var(--color-form-input-background);
    border: none;
`;

const StyledLabel = styled.p`
    font-weight: normal;
    position: absolute;
    left: 16px;
    top: -8px;
    font-size: .66rem;

    color: var(--color-primary-text-off)
`;

export default FormTextInput
