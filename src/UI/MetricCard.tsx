import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  current: string;
  previous: string;
  trend: "up" | "down" | "neutral";
  color?: "bright" | "normal";
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  current,
  previous,
  trend,
  color = "normal",
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp size={16} className="trend-icon up" />;
      case "down":
        return <TrendingDown size={16} className="trend-icon down" />;
      default:
        return <Minus size={16} className="trend-icon neutral" />;
    }
  };

  return (
    <div className={`metric-card ${color}`}>
      <div className="metric-header">
        <h4 className="metric-title">{title}</h4>
        {getTrendIcon()}
      </div>
      <div className="metric-content">
        <div className="metric-current">{current}</div>
        <div className="metric-previous">{previous}</div>
      </div>
    </div>
  );
};

export default MetricCard;
