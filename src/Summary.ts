import { MatchData } from './MatchData'
import { WinAnalysis } from './analyzers/WinAnalysis'
import { HtmlReport } from './reportTargets/HtmlReport'

export interface Analyzer {
  run(Matches: MatchData[]): string
}

export interface OutputTarget {
  print(report: string): void
}

export class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

  static winAnalysisWithHtmlReport(team: string): Summary {
    return new Summary(new WinAnalysis(team), new HtmlReport())
  }

  buildAndPrintReport(matches: MatchData[]) {
    const output = this.analyzer.run(matches)
    this.outputTarget.print(output)
  }
}
