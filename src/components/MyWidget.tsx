// src/components/MyWidget.tsx
import React from 'react';

const MyWidget = ({ data }: { data: any }) => {
    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
            <h3>Widget Titleoo</h3>
            <p>{data.message}</p>
        </div>
    );
};

export default MyWidget;
