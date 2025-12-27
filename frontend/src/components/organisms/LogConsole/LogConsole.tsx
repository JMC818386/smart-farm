/**
 * ORGANISM: LogConsole
 * Per COMPONENT_CATALOG.md
 */

import React from 'react';
import { useFarmStore } from '../../../store/farmStore';
import './LogConsole.css';

export const LogConsole: React.FC = () => {
  const logs = useFarmStore((state) => state.logs);
  
  return (
    <div className="log-console panel">
      <h3 className="log-console__title display">System Log</h3>
      <div className="log-console__entries">
        {logs.length === 0 ? (
          <div className="log-console__empty">No activity logged</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="log-console__entry">
              <span className="log-console__timestamp mono">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span className="log-console__action">{log.action}</span>
              <span className="log-console__details">{log.details}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
