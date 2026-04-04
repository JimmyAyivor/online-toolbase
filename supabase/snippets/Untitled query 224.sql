CREATE TABLE affiliate_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_slug TEXT,
  offer_key TEXT,
  ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tool_slug ON affiliate_clicks(tool_slug);
CREATE INDEX idx_offer_key ON affiliate_clicks(offer_key);