
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CategoryKey } from '../types';
import { CATEGORIES } from '../constants';

interface WorldMapProps {
  category: CategoryKey;
  data: Record<string, number>;
  onCountrySelect: (countryId: string, countryName: string) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ category, data, onCountrySelect }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then(d => setGeoData(d))
      .catch(err => console.error("Karten-Geometrie konnte nicht geladen werden:", err));
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 550;
    const svg = d3.select(svgRef.current);
    
    svg.selectAll("*").remove();

    const projection = d3.geoMercator()
      .scale(width / 6.4)
      .translate([width / 2, height / 1.45]);

    const path = d3.geoPath().projection(projection);

    const values = Object.values(data).filter(v => typeof v === 'number');
    const minVal = d3.min(values) ?? 0;
    const maxVal = d3.max(values) ?? 100;

    const colorScale = d3.scaleSequential(d3.interpolateRgb(
      CATEGORIES[category].colorScale[0], 
      CATEGORIES[category].colorScale[1]
    )).domain([minVal, maxVal]);

    const tooltip = d3.select("body").append("div")
      .attr("class", "fixed hidden bg-slate-900/95 backdrop-blur-md text-white text-[11px] px-3 py-2 rounded-xl shadow-2xl pointer-events-none z-[100] border border-white/10 ring-1 ring-black/5");

    const g = svg.append("g");

    // Ocean layer
    g.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "transparent");

    g.selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("d", path as any)
      .attr("fill", (d: any) => {
        const val = data[d.id];
        return val !== undefined ? colorScale(val) : '#f1f5f9';
      })
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.5)
      .style("cursor", "pointer")
      .on("mouseover", (event, d: any) => {
        const countryName = d.properties.name;
        const val = data[d.id];
        const formattedVal = val !== undefined ? `${val.toLocaleString()} ${CATEGORIES[category].unit}` : 'Keine Daten';
        
        tooltip.style("display", "block")
          .html(`<div class="font-bold border-b border-white/20 mb-1 pb-1">${countryName}</div>
                 <div class="flex items-center gap-2">
                   <div class="w-2 h-2 rounded-full" style="background: ${val !== undefined ? colorScale(val) : '#cbd5e1'}"></div>
                   <span class="opacity-80">${CATEGORIES[category].label}:</span>
                   <span class="font-bold">${formattedVal}</span>
                 </div>`);
        
        // Fixed: Call .raise() BEFORE .transition()
        d3.select(event.currentTarget)
          .raise()
          .transition().duration(200)
          .attr("stroke", "#0f172a")
          .attr("stroke-width", 1.5);
      })
      .on("mousemove", (event) => {
        tooltip.style("top", (event.clientY - 45) + "px")
               .style("left", (event.clientX + 15) + "px");
      })
      .on("mouseleave", (event) => {
        tooltip.style("display", "none");
        d3.select(event.currentTarget)
          .transition().duration(200)
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 0.5);
      })
      .on("click", (event, d: any) => {
        onCountrySelect(d.id, d.properties.name);
      });

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 15])
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        g.selectAll("path").attr("stroke-width", 0.5 / event.transform.k);
      });

    svg.call(zoom);

    return () => {
      tooltip.remove();
    };
  }, [geoData, category, data, onCountrySelect]);

  return (
    <div ref={containerRef} className="relative w-full h-[550px] bg-white rounded-[2rem] shadow-2xl shadow-slate-300/40 border border-slate-200/60 overflow-hidden group">
      <svg
        ref={svgRef}
        className="w-full h-full touch-none"
      />
      
      {/* Visual Controls */}
      <div className="absolute top-6 right-6 flex flex-col gap-3">
        <button 
          onClick={() => d3.select(svgRef.current).transition().call(d3.zoom().scaleBy as any, 1.8)}
          className="w-12 h-12 bg-white/80 backdrop-blur shadow-xl rounded-2xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white hover:scale-105 active:scale-95 transition-all font-black text-xl"
        >
          +
        </button>
        <button 
          onClick={() => d3.select(svgRef.current).transition().call(d3.zoom().scaleBy as any, 0.5)}
          className="w-12 h-12 bg-white/80 backdrop-blur shadow-xl rounded-2xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white hover:scale-105 active:scale-95 transition-all font-black text-xl"
        >
          −
        </button>
      </div>

      <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-slate-200 shadow-2xl max-w-[220px]">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Legende</h4>
        <div className="space-y-1.5">
          <div className="text-[13px] font-bold text-slate-900 truncate">{CATEGORIES[category].label}</div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-400 font-bold">MIN</span>
            <div 
              className="flex-1 h-3 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
              style={{ background: `linear-gradient(to right, ${CATEGORIES[category].colorScale[0]}, ${CATEGORIES[category].colorScale[1]})` }}
            />
            <span className="text-[10px] text-slate-400 font-bold">MAX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
