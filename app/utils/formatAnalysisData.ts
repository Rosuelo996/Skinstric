const formatAnalysisData = (
  data: Record<string, number> | undefined,
): [string, number][] => {
  const entries = Object.entries(data || {});

  return entries
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => [key, Number((value * 100).toFixed(2))]);
};

export default formatAnalysisData;
