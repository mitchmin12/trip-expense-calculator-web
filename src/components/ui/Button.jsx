import styled from "styled-components";

const SIZES = {
    small: {
      "--borderRadius": 2 + "px",
      "--fontSize": 16 / 16 + "rem",
      "--padding": "6px 12px"  
    },
    medium: {
        "--borderRadius": 2 + "px",
        "--fontSize": 18 / 16 + "rem",
        "--padding": "14px 20px"  
    },
    large: {
    "--borderRadius": 4 + "px",
    "--fontSize": 21 / 16 + "rem",
    "--padding": "18px 32px"  
    },
}


const Button = ({ className, variant, size, children, onClick, isDisabled=false, style,}) => {
  const sizeStyle = SIZES[size];
  const styles = {...sizeStyle, ...style}
  
  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  }
//   else if (variant === "ghost") {
//     Component = GhostButton;
//   }
  else {
    throw new Error(`Unrecognized Button variant: ${variant}`)
  }

    return <Component disabled={isDisabled} style={styles} className={className} onClick={onClick}>{children}</Component>;
};

const ButtonBase = styled.button`
    font-size: var(--fontSize);
    padding: var(--padding);
    border-radius: var(--borderRadius);
    border: none;
    cursor: pointer;
    white-space: nowrap;

    &:disabled {
        opacity: 50%;
        cursor: default;
    }
`;

const FillButton = styled(ButtonBase)`
    background-color: var(--color-accent-green);
    color: var(--color-primary-text);

    &:hover:enabled {
        background-color: var(--color-accent-green-off);
        color: var(--color-primary-text-off);
    }
`;

const OutlineButton = styled(ButtonBase)`
    background-color: transparent;
    color: var(--color-accent-green);
    border: 2px solid currentColor;

    &:hover:enabled {
        color: var(--color-accent-green-off);
        border: 2px solid var(--color-accent-green-off);
    }
`;

// const GhostButton = styled(ButtonBase)`
//     color: ${COLORS.gray};
//     background-color: transparent;

//     &:focus {
//         outline-color: ${COLORS.gray};
//     }

//     &:hover {
//         color: black;       
//         background-color: ${COLORS.transparentGray15};
//     }
// `;

export default Button;
