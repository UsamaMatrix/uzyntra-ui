"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { formatTimestamp, modeClasses, severityClasses } from "@/lib/format";
import SectionCard from "@/components/SectionCard";
import Badge from "@/components/Badge";

const DEFAULT_LIMIT = 10;

export default function EventsPage() {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    source_ip: "",
    rule_id: "",
    severity: "",
    method: "",
    path_contains: "",
    limit: DEFAULT_LIMIT,
    offset: 0,
  });

  async function loadEvents(nextFilters = filters) {
    setLoading(true);
    setError("");

    try {
      const response = await api.searchEvents(nextFilters);
      const items = response?.data?.items || [];
      setRows(items);
      setSelected((current) => {
        if (!items.length) return null;
        if (!current) return items[0];
        return items.find((item) => item.request_id === current.request_id) || items[0];
      });
    } catch (err) {
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents(filters);
  }, []);

  function updateFilter(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function applyFilters() {
    const next = {
      ...filters,
      offset: 0,
    };
    setFilters(next);
    loadEvents(next);
  }

  function resetFilters() {
    const next = {
      source_ip: "",
      rule_id: "",
      severity: "",
      method: "",
      path_contains: "",
      limit: DEFAULT_LIMIT,
      offset: 0,
    };
    setFilters(next);
    loadEvents(next);
  }

  function nextPage() {
    const next = {
      ...filters,
      offset: Number(filters.offset || 0) + Number(filters.limit || DEFAULT_LIMIT),
    };
    setFilters(next);
    loadEvents(next);
  }

  function prevPage() {
    const next = {
      ...filters,
      offset: Math.max(0, Number(filters.offset || 0) - Number(filters.limit || DEFAULT_LIMIT)),
    };
    setFilters(next);
    loadEvents(next);
  }

  const tableRows = useMemo(() => rows || [], [rows]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Events Explorer</h1>
        <p className="mt-1 text-sm text-slate-500">
          Search, review, and inspect security events from the admin plane
        </p>
      </div>

      <SectionCard
        title="Filters"
        right={
          <div className="flex gap-2">
            <button
              onClick={resetFilters}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Search
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Field
            label="Source IP"
            value={filters.source_ip}
            onChange={(e) => updateFilter("source_ip", e.target.value)}
            placeholder="127.0.0.1"
          />
          <Field
            label="Rule ID"
            value={filters.rule_id}
            onChange={(e) => updateFilter("rule_id", e.target.value)}
            placeholder="body.sqli.basic"
          />
          <SelectField
            label="Severity"
            value={filters.severity}
            onChange={(e) => updateFilter("severity", e.target.value)}
            options={["", "critical", "high", "medium", "low"]}
          />
          <SelectField
            label="Method"
            value={filters.method}
            onChange={(e) => updateFilter("method", e.target.value)}
            options={["", "GET", "POST", "PUT", "PATCH", "DELETE"]}
          />
          <Field
            label="Path contains"
            value={filters.path_contains}
            onChange={(e) => updateFilter("path_contains", e.target.value)}
            placeholder="/proxy/post"
          />
          <SelectField
            label="Page size"
            value={filters.limit}
            onChange={(e) => updateFilter("limit", Number(e.target.value))}
            options={[10, 20, 50]}
          />
        </div>
      </SectionCard>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <SectionCard
          title="Results"
          right={
            <div className="text-xs text-slate-500">
              {loading ? "Loading..." : `${tableRows.length} item(s)`}
            </div>
          }
        >
          <div className="table-wrap">
            <table className="table-ui">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Source IP</th>
                  <th>Method</th>
                  <th>Path</th>
                  <th>Rule</th>
                  <th>Severity</th>
                  <th>Mode</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No events found
                    </td>
                  </tr>
                ) : (
                  tableRows.map((row) => {
                    const finding = row.findings?.[0];
                    const active = selected?.request_id === row.request_id;

                    return (
                      <tr
                        key={row.request_id}
                        onClick={() => setSelected(row)}
                        className={`cursor-pointer align-top transition ${
                          active ? "bg-slate-50" : "hover:bg-slate-50/70"
                        }`}
                      >
                        <td>{formatTimestamp(row.timestamp)}</td>
                        <td>{row.source_ip}</td>
                        <td>{row.method}</td>
                        <td>
                          <div className="max-w-xs truncate sm:max-w-sm lg:max-w-md">
                            {row.path}
                          </div>
                        </td>
                        <td>{finding?.rule_id || "—"}</td>
                        <td>
                          {finding?.severity ? (
                            <Badge className={severityClasses(finding.severity)}>
                              {finding.severity}
                            </Badge>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>
                          {finding?.mode ? (
                            <Badge className={modeClasses(finding.mode)}>
                              {finding.mode}
                            </Badge>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Offset: {filters.offset} • Limit: {filters.limit}
            </p>

            <div className="flex gap-2">
              <button
                onClick={prevPage}
                disabled={Number(filters.offset) <= 0 || loading}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={loading || tableRows.length < Number(filters.limit)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Event Details">
          {!selected ? (
            <div className="text-sm text-slate-500">Select an event to inspect details.</div>
          ) : (
            <div className="space-y-5">
              <DetailItem label="Request ID" value={selected.request_id} />
              <DetailItem label="Timestamp" value={formatTimestamp(selected.timestamp)} />
              <DetailItem label="Source IP" value={selected.source_ip} />
              <DetailItem label="Method" value={selected.method} />
              <DetailItem label="Path" value={selected.path} />

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Findings
                </p>
                <div className="space-y-3">
                  {(selected.findings || []).map((finding, idx) => (
                    <div
                      key={`${finding.rule_id}-${idx}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900">{finding.rule_id}</p>
                        <Badge className={severityClasses(finding.severity)}>
                          {finding.severity}
                        </Badge>
                        <Badge className={modeClasses(finding.mode)}>{finding.mode}</Badge>
                      </div>

                      <p className="mt-2 text-sm text-slate-700">{finding.message}</p>

                      <p className="mt-2 text-xs text-slate-500">
                        Confidence: {Number(finding.confidence || 0).toFixed(2)}
                      </p>

                      {finding.evidence?.length ? (
                        <div className="mt-3 space-y-2">
                          {finding.evidence.map((evidence, evidenceIdx) => (
                            <div
                              key={`${finding.rule_id}-e-${evidenceIdx}`}
                              className="rounded-lg border border-slate-200 bg-white p-3"
                            >
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                {evidence.location}
                              </p>
                              <p className="mt-1 break-all font-mono text-xs text-slate-700">
                                {evidence.value_preview}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Decision Summary
                </p>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-800">
                    {selected.decision?.summary || "—"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
      />
    </label>
  );
}

function SelectField({ label, options, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400"
      >
        {options.map((option) => (
          <option key={String(option)} value={option}>
            {option === "" ? "Any" : option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 break-all text-sm text-slate-900">{value || "—"}</p>
    </div>
  );
}
