'use client'

import { Wifi, Cloud, Zap, Activity } from 'lucide-react'

const sensorData = [
  { label: 'Temperature', value: '24.5°C', icon: Zap, status: 'active' },
  { label: 'Humidity', value: '65%', icon: Cloud, status: 'active' },
  { label: 'Device Status', value: 'Online', icon: Activity, status: 'active' },
]

export function IotDashboard() {
  return (
    <section id="iot" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-accent/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-16 fade-in">
          <h2 className="section-heading text-balance">IoT Systems & Embedded Intelligence</h2>
          <p className="text-lg text-foreground/70 text-balance max-w-2xl">
            Real-time monitoring and control of IoT devices, sensors, and embedded systems with enterprise-grade reliability.
          </p>
        </div>

        <div className="space-y-8">
          {/* Main Dashboard Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {sensorData.map((sensor, index) => {
              const Icon = sensor.icon
              const colors = ['text-vibrant-blue', 'text-neon-green', 'text-neon-pink']
              const bgColors = ['bg-blue-500/20', 'bg-green-500/20', 'bg-pink-500/20']
              return (
                <div
                  key={sensor.label}
                  className="group glass-dark rounded-xl p-6 border border-white/10 transition-all duration-300 hover-lift glow-pulse card-hover"
                  style={{
                    animation: `slide-in-from-bottom 0.8s ease-out ${0.35 + index * 0.15}s both`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${bgColors[index]} flex items-center justify-center group-hover:bg-opacity-40 transition-all bounce-in`} style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                      <Icon className={`w-6 h-6 ${colors[index]} spin-slow`} />
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-sm text-foreground/70 mb-2">{sensor.label}</h3>
                  <p className={`text-3xl font-bold ${colors[index]}`}>{sensor.value}</p>
                </div>
              )
            })}
          </div>

          {/* Graph Placeholder */}
          <div className="glass-dark rounded-xl p-8 border border-white/10 fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Real-time Data Stream</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-foreground/60">Live</span>
              </div>
            </div>
            
            {/* Mock graph */}
            <div className="w-full h-48 bg-gradient-to-b from-primary/20 to-transparent rounded-lg flex items-end justify-around p-4 border border-white/5">
              {[65, 80, 55, 90, 70, 85, 75, 95, 70, 80].map((height, i) => (
                <div
                  key={i}
                  className="w-2 md:w-3 bg-gradient-to-t from-accent to-primary rounded-sm opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-y-125"
                  style={{ 
                    height: `${height}%`,
                    animation: `pulse-glow 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Device Toggles */}
            <div className="glass-dark rounded-xl p-6 border border-white/10 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Wifi size={20} className="text-accent" />
                Device Controls
              </h3>
              <div className="space-y-3">
                {['Device 1', 'Device 2', 'Device 3'].map((device) => (
                  <div key={device} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-sm text-foreground/80">{device}</span>
                    <button suppressHydrationWarning className="w-10 h-6 bg-primary/40 rounded-full relative transition-colors hover:bg-primary/60">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* MQTT Status */}
            <div className="glass-dark rounded-xl p-6 border border-white/10 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Cloud size={20} className="text-primary" />
                Connection Status
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60">MQTT Broker</span>
                    <span className="text-xs px-2 py-1 bg-green-400/20 text-green-300 rounded">Connected</span>
                  </div>
                  <p className="text-xs text-foreground/40">broker.mqtt.local:1883</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60">Last Update</span>
                    <span className="text-xs text-foreground/40">2.3s ago</span>
                  </div>
                  <p className="text-xs text-foreground/40">Uptime: 23d 4h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
