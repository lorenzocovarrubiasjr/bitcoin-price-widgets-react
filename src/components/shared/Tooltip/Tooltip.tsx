import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css'

interface TooltipProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    className?: string;
}

const Tooltip = ({ children, content, position = 'top', delay = 300, className = '' }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState(position);
    const timeoutRef = useRef<NodeJS.Timeout>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    // Calculate tooltip position to avoid viewport overflow
    useEffect(() => {
        if (isVisible && triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };

            let newPosition = position;

            // Check if tooltip overflows viewport and adjust position
            if (position === 'top' && triggerRect.top - tooltipRect.height < 0) {
                newPosition = 'bottom';
            } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height > viewport.height) {
                newPosition = 'top';
            } else if (position === 'left' && triggerRect.left - tooltipRect.width < 0) {
                newPosition = 'right';
            } else if (position === 'right' && triggerRect.right + tooltipRect.width > viewport.width) {
                newPosition = 'left';
            }

            setTooltipPosition(newPosition);
        }
    }, [isVisible, position]);

    // Don't render if no content
    if (!content) return children;

    return (
        <div
            ref={triggerRef}
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
            className={className}
        >
            {children}
            <div
                ref={tooltipRef}
                className={`tooltip ${tooltipPosition}`}
                style={{
                    opacity: isVisible ? 0.8 : 0,
                    visibility: isVisible ? 'visible' : 'hidden'
                }}
                role="tooltip"
                aria-hidden={!isVisible}
            >
                {content}
                <div className={`arrow arrow-${tooltipPosition}`} />
            </div>
        </div>
    );
};

export default Tooltip;